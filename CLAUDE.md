# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Schrijfcoach** is a personal Dutch language learning app (A1–B2) built as a pure vanilla HTML/CSS/JavaScript single-page application. No build tools, no frameworks, no npm. Open `index.html` in a browser and it runs.

Deployed as a static site on Vercel. Every `git push` to `master` auto-deploys to production.

## Running locally

Open `index.html` directly in a browser — there is no dev server or build step.

For audio (TTS read-aloud in the Lezen tab): open in **Microsoft Edge**. Edge's neural Dutch voices are significantly better than Chrome's. Don't add fallback TTS or Google Translate audio.

To debug JS errors: call `getErrorLog()` in the browser console.

## Deploying

```
git add <files>
git commit -m "type: description"
git push
```

Vercel picks up the push and deploys automatically. There is no CI, no build command.

## Architecture

Everything lives in four JS files loaded in order by `index.html`:

| File | Purpose | Size |
|------|---------|------|
| `js/data.js` | Sentence data (`defaultSentences[]`), verb conjugations (`verbs[]`), vocabulary (`vocabulary[]`), de/het words (`dehetWords[]`) | ~6300 lines |
| `js/grammar-data.js` | Grammar reference (`grammarTopicsData[]`) + study plan (`lessonPlanData`) | ~2000 lines |
| `js/reading-data.js` | Reading texts — exports `readingTexts[]` | ~3750 lines |
| `js/app.js` | All application logic | ~6100 lines |
| `css/styles.css` | All styles | — |

All JS is global-scope; functions and variables are shared across files. There is no module system.

### Tab system

The app has 13 tabs, each with a corresponding `#panel-<id>` div in `index.html`. `switchTab(id)` in `app.js` activates the correct panel and calls the tab's render/init function. Tabs listed in the `dropdownTabs` array inside `switchTab` live in the "Per onderwerp" dropdown rather than the main nav.

| Tab ID | Label | Function called |
|--------|-------|-----------------|
| `home` | Home | `renderHome()` |
| `oefening` | Zinnen oefenen | `loadSentence()`, `renderUnitBar()` |
| `werkwoorden` | Werkwoorden | `renderUnitBar()` |
| `lezen` | Lezen | `openReadingLibrary()` |
| `mijnwoorden` | Mijn woorden | `renderMijnWoorden()` |
| `dehet` | De / Het | `renderUnitBar()` |
| `ontkenning` | Niet & Geen | `_initNegExercises()` |
| `hebbenzijn` | Hebben of zijn | `_initHebZijn()` |
| `woordenschat` | Woordenschat | `renderVocab()`, `renderUnitBar()` |
| `zinnen` | Alle zinnen | `renderSentences()` |
| `bewerken` | Bewerken | `renderEditTable()`, `renderFlagsSection()` |
| `grammatica` | Grammatica | `renderGrammarContent()`, `renderUnitBar()` |
| `leerplan` | Leerplan | `renderLessonPlan()` |

### Persistence (localStorage)

All user progress is stored in localStorage. All keys are prefixed `schrijfcoach_`:

| Key | Contents |
|-----|---------|
| `schrijfcoach_sentences` | User-edited sentences (overrides `defaultSentences`) |
| `schrijfcoach_stats` | Exercise correct/wrong counts per sentence |
| `schrijfcoach_srs` | Spaced repetition (SRS) scheduling data |
| `schrijfcoach_flags` | Starred sentences and comments |
| `schrijfcoach_grammar_read` | Which grammar topics have been read |
| `schrijfcoach_unit_progress` | Unit completion per tab |
| `schrijfcoach_last_position` | Last active unit/tab for "Doorgaan" button |
| `schrijfcoach_reading_history` | Which texts have been read on which dates |
| `schrijfcoach_unknown_words` | Words marked unknown in reading texts |
| `schrijfcoach_progress` | Save/load slot (JSON export via Opslaan button) |

Helper functions `_lsGet(key)`, `_lsSet(key, value)`, `_lsRemove(key)` wrap localStorage with error handling. Use these, not `localStorage` directly.

### Exercise UX pattern

All exercises follow the same feedback pattern:

- **Correct answer** → show green feedback box → auto-advance after ~1 second. The feedback box is also clickable/tappable to advance immediately (important for mobile).
- **Wrong answer** → show red feedback box with correct answer → show "Volgende →" button. Do NOT auto-advance on wrong answers.

This pattern applies to: Zinnen oefenen, De/Het, Niet & Geen, Werkwoorden, Woordenschat, and vocabulary practice in Lezen/Mijn woorden.

### Niet & Geen's two exercises

The tab holds two independent drills in `<details class="card" name="neg-exercise">` elements
(`index.html`) — the shared `name` is what makes opening one natively collapse the other, no JS
accordion needed. Both still initialize and render their first question on tab load
(`_initNegExercises()`, `js/app.js`) regardless of which is visually open, so switching to the
collapsed one shows a ready question instantly rather than a blank card.

Wrong-answer explanations go through `_negExplain()` (`js/app.js`), which always renders a rule —
`s.srule` when the sentence has one, otherwise the `ontkenning` grammar topic's golden-rule intro
(`js/grammar-data.js`) — so a mistake is never left silently unexplained even if a future sentence
is added with no `srule`. It also prefixes a contrastive line naming what was picked vs. the right
answer (`_pickNegChoice`) or where "niet" was placed vs. where it belongs (`_pickNegSlot`,
`_negSlotDesc`) — only on a wrong answer; a correct one still shows the plain rule.

Both pools are built from `gtopic: 'niet'|'geen'` sentences, but a `gtopic` tag alone isn't
sufficient — Choose blanks the literal word with `/\b(niet|geen)\b/i` and Place removes/reinserts
the exact token `'niet'`, so a sentence tagged `gtopic:'niet'` that uses a different negation word
(`nooit`, `niemand`, `niets`, `nergens` — all valid for `ontkenning` grammar filtering elsewhere)
has nothing for either mechanic to act on. `_negHasWord(nl, word)` (`js/app.js`) is the shared
word-boundary check both pool builders (`_isNegChooseSentence`, `_isNegPlaceSentence`) use to
exclude those sentences from these two exercises specifically, without touching the underlying
data — they stay valid everywhere else `gtopic` is used. Don't loosen either pool filter back to
a substring test (`.includes('niet')`) or a bare `gtopic` check; that reintroduces a silent
missing-blank (Choose) or a `null`-slot crash (Place).

### Reading texts (`js/reading-data.js`)

The freeze that used to apply to this file was lifted 2026-05-17; new texts are welcome. 51 texts currently exist (A1 8, A2 27, B1 10, B2 6).

Each text has a stable `id` (e.g. `'r-001'`). Reading history is keyed by `id`. Never reuse or renumber IDs.

### Sentence data (`js/data.js`)

Each sentence object:
```js
{ nl: "Dutch text", en: "English text", level: "A1", stype: "Hoofdzin",
  srule: "S → V → O — word order explanation", gtopic: "optional-grammar-topic-id" }
```

Levels: `A1`, `A2`, `B1`, `B2`. Grammar types (`stype`): `Hoofdzin`, `Vraagzin`, `Bijzin`, `WH-vraagzin`, `Samengestelde zin`, `Vaste uitdrukking`, etc.

### Verb auxiliaries (`aux`) and the Hebben-of-zijn drill

Every verb in `verbs[]` carries `aux: 'hebben'|'zijn'` (the 7th argument of the `r`/`ii`/`sp`/`rf`
helpers, defaulting to `hebben`) plus a bare `participle`. The Hebben-of-zijn tab generates its
questions from these — no sentences are authored.

Four supporting lists sit next to `verbs[]` in `js/data.js`:

- **`hebZijnDual`** — verbs where *both* auxiliaries are correct (`lopen`, `fietsen`, `veranderen`,
  `vergeten`, …). These are excluded from the drill, because a two-button question cannot have two
  right answers. Add to this list rather than forcing a single `aux` when a verb is genuinely split.
- **`hebZijnReason`** — the BAGS category (`b` beweging / `v` verandering / `u` uitzondering) for
  each zijn-verb, used for the feedback that explains *why*. Every `aux:'zijn'` verb outside the
  dual list needs an entry.
- **`hebZijnExtra`** — everyday verbs absent from `verbs[]` (`gebeuren`, `dalen`, `verkopen`, …),
  added as drill-only entries because they cannot be inserted into the array (see below).
- **`hebZijnBeginner`** — common zijn-verbs that sit late in `verbs[]` only because of where the
  curriculum introduces them; forced into the A1 band so a beginner filter doesn't hide them.

**Sessions are balanced 50/50, not proportional.** Only ~1 verb in 10 takes zijn, so an
unweighted pool lets you answer "hebben" every time and still score ~90% without ever making the
judgement. `_hzVerbPool()` therefore pairs every zijn-verb at the chosen level with an equal
sample of hebben-verbs, resampled each restart. The "Gemengd 50/50" badge is a *session size*
(2 × the smaller side), not a pool count.

The drill derives its own A1/A2/B1/B2 bands (`HZ_BANDS`) rather than using `VERB_LEVEL_RANGES`,
which deliberately merges A1+A2 for the Werkwoorden meaning quiz. Don't unify them — widening
`VERB_LEVEL_RANGES` would change that quiz's filter buttons.

Note `verbRange` in `lessonPlanData` indexes `verbs[]` **positionally**, so never insert a verb
mid-array — it would silently shift every unit's verb range.

### Curriculum structure (`js/grammar-data.js` → `lessonPlanData`)

`lessonPlanData.levels[].units[]` is the study plan: 20 units (A1 ×4, A2 ×5, B1 ×6, B2 ×5), each a themed set of `grammarTopics`, `verbRange`/`verbFocus`, `vocabTopics` (`{level, topic}` pairs), `readingTexts`, `activities`, and `goals`. Every reading text and every A1–B2 vocabulary `{level, topic}` group is assigned to at least one unit — before adding new content to any of the four data files, check whether it should also be wired into a unit here so the study plan actually surfaces it. A Node audit script (cross-checks all these references, run via `vm` against the raw data files — see prior session transcripts for the script) should be re-run after any edit to this structure.

`unitProgress` in localStorage is schema-versioned (`UNIT_PROGRESS_SCHEMA_KEY`/`UNIT_PROGRESS_SCHEMA_VERSION` in `app.js`) — bump the version constant if the unit map changes again, so stale per-unit checkmarks reset with a one-time toast instead of silently misaligning with new unit contents. Stats, SRS, Mijn woorden and reading history are unaffected by this reset (keyed by content id, not unit number).

### Content volume status (as of 2026-07-19)

Current counts: 42 grammar topics (every one has a lesson card + 6+ practice sentences + a working exercise filter), 2,907 vocabulary words (every A1–B2 `{level, topic}` group sits at 20–31 words), 460 practice sentences, 51 reading texts, 811 verbs.

This is a solid personal-study scaffold but is **not yet equivalent to full CEFR B1/B2 proficiency**: cumulative vocabulary through B2 is still well under the ~4,000–5,000 words CEFR B2 assumes, and there is no listening-comprehension or speaking-production exercise anywhere in the app (TTS read-aloud is a reading aid, not a listening exercise). If asked to close this gap further, treat it as a large, multi-session content effort — batch it (thinnest groups first, ~20–25 words per group per batch, verify no duplicate `(level, topic, nl)` keys, re-run the audit script, headless-render-check the Woordenschat tab) rather than attempting it in one pass.

## Things to avoid

- Do not add streak/gamification features (fire emoji, racha counters) — they were intentionally removed.
- Do not add Google Translate TTS or audio fallbacks — Edge neural voices are the standard.
- Do not introduce build tools, bundlers, or npm — this is intentionally zero-dependency.
- When splicing new entries into the large arrays in `js/data.js` / `js/grammar-data.js`, use exact line-number `head`/`tail` splicing to a temp file, not `awk`/`sed` pattern-matching on content — a pattern match can fire on a line *inside* an object rather than before its opening `{`, corrupting the file. Always verify with a Node `vm` parse check immediately after.

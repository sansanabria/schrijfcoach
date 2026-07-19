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

The app has 11 tabs, each with a corresponding `#panel-<id>` div in `index.html`. `switchTab(id)` in `app.js` activates the correct panel and calls the tab's render/init function.

| Tab ID | Label | Function called |
|--------|-------|-----------------|
| `home` | Home | `renderHome()` |
| `oefening` | Zinnen oefenen | `loadSentence()`, `renderUnitBar()` |
| `werkwoorden` | Werkwoorden | `renderUnitBar()` |
| `lezen` | Lezen | `openReadingLibrary()` |
| `mijnwoorden` | Mijn woorden | `renderMijnWoorden()` |
| `dehet` | De / Het | `renderUnitBar()` |
| `ontkenning` | Niet & Geen | `_initNegExercises()` |
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

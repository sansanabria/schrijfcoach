# Schrijfcoach — App Documentation

## What this app is
A Dutch language learning app that runs entirely in the browser — no server, no backend, no installation needed. It covers vocabulary, grammar, verb conjugation, sentence practice, and de/het exercises from A1 to B2 level, following a structured 36-week lesson plan.

---

## File structure

```
. schrijfcoach/
├── index.html          ← All tabs, panels, and HTML structure
├── css/
│   └── styles.css      ← All visual styling and layout
└── js/
    ├── data.js         ← All learning content (sentences, verbs, vocabulary, de/het words)
    ├── grammar-data.js ← Grammar explanations + lesson plan
    └── app.js          ← All app logic (what happens when you click things)
```

**Rule of thumb:**
- Want to change **content**? → Edit `data.js` or `grammar-data.js`
- Want to change **how it looks**? → Edit `styles.css`
- Want to change **how it works**? → Edit `app.js`
- Want to add/remove **tabs or buttons**? → Edit `index.html`

---

## Where to modify each type of content

### 1. Add or edit a sentence
**File:** `js/data.js` — array `defaultSentences` (top of file)

Each sentence looks like this:
```js
{ nl: "Ik spreek Nederlands.",
  en: "I speak Dutch.",
  level: "A1",
  stype: "Hoofdzin",
  srule: "S → V → O — werkwoord staat altijd op de tweede positie" }
```

| Field | What it does |
|---|---|
| `nl` | The Dutch sentence (used as the unique key — don't duplicate) |
| `en` | English translation (what the student sees as the prompt) |
| `level` | Difficulty: `"A1"`, `"A2"`, `"B1"`, or `"B2"` |
| `stype` | Sentence type label shown on the card |
| `srule` | Word order rule shown as a hint |

---

### 2. Add or edit a vocabulary word
**File:** `js/data.js` — array `vocabulary` (middle of file, after sentences)

```js
{ nl: "de kat", en: "cat", type: "zn.", level: "A1", topic: "dieren" }
```

| Field | Options |
|---|---|
| `type` | `"zn."` noun, `"ww."` verb, `"bn."` adjective, `"bw."` adverb, `"vz."` preposition, `"uitdr."` expression |
| `level` | `"A1"` `"A2"` `"B1"` `"B2"` |
| `topic` | Must match one of the topic keys in `topicLabels` in `app.js` (e.g. `"familie"`, `"eten"`, `"huis"`, `"voorzetsels"`, `"bijvoeglijk"`) |

To add a **new topic**, also add it to the `topicLabels` object in `app.js` around line 111:
```js
mynewtopic: 'My New Topic Label',
```

---

### 3. Add or edit a de/het word
**File:** `js/data.js` — array `dehetWords` (near the bottom)

```js
{ word: "huis", article: "het", level: "A1", en: "house",
  reason: "Verkleinwoorden zijn altijd het-woorden.",
  reasonEn: "Diminutives are always het-words." }
```

The `reason` and `reasonEn` fields show the grammar rule when the student answers — very helpful for learning.

---

### 4. Add or edit a verb
**File:** `js/data.js` — array `verbs` (after sentences, before vocabulary)

Verbs are added using helper functions:
```js
// Regular verb:
r("werken", "to work")

// Irregular verb:
ii("zijn", "to be", ["ben","bent","is","zijn","zijn","zijn"], "was", "waren", "geweest", "zijn")
//    ↑inf    ↑eng    ↑6 present forms (ik/jij/u/hij/wij/jullie)   ↑past ↑pl.past ↑participle ↑auxiliary
```

The `auxiliary` (last parameter) is `"zijn"` or `"hebben"` — this controls which helper verb is used in the perfect tense.

---

### 5. Add or edit a grammar topic
**File:** `js/grammar-data.js` — array `grammarTopicsData`

Each topic is an object with these key fields:

```js
{
  id: "my-topic",          // unique key, used in lesson plan
  level: "A2",             // "A1" | "A2" | "B1" | "B2"
  filter: "werkwoord",     // category for filtering
  title: "Mijn onderwerp", // Dutch title
  titleEn: "My topic",     // English title
  intro: "...",            // Dutch explanation (1-2 sentences)
  introEn: "...",          // English explanation
  tables: [{               // optional: data tables
    heading: "...", headingEn: "...",
    cols: ["Col1", "Col2"],
    rows: [["data", "data"], ...]
  }],
  rules: [                 // bullet-point rules
    { nl: "Regel in het Nederlands.", en: "Rule in English." }
  ],
  examples: [              // sentence examples
    { nl: "Zin in het Nederlands.", en: "English translation.", note: "optional note" }
  ],
  tip: "Tip in het Nederlands.",
  tipEn: "Tip in English."
}
```

Place A1 topics before line marked `// ══ A2 ══`, A2 topics before `// ══ B1 ══`, etc.

---

### 6. Update the lesson plan
**File:** `js/grammar-data.js` — object `lessonPlanData` (near the bottom)

Each unit looks like this:

```js
{
  unit: 1,
  title: "Eerste contacten",
  titleEn: "First contacts",
  weeks: "Week 1–2",
  grammarTopics: ["persoonlijke-vnw", "vraagwoorden"],  // IDs from grammarTopicsData
  verbFocus: ["zijn", "hebben", "heten"],               // verb infinitives from data.js
  vocabTopics: [{level:"A1", topic:"begroeting"}],      // must match vocabulary topics
  sentenceFilter: "vraagzin",                           // filters the sentence exercise
  activities: [...],   // descriptions shown in the lesson plan view
  goals: [...],        // Dutch learning goals
  goalsEn: [...]       // English learning goals
}
```

---

### 7. Change the visual style
**File:** `css/styles.css`

Key CSS variables at the top of the file control the whole color theme:
```css
--primary: #276047;      /* main green color */
--bg: #f9fafb;           /* page background */
--card-bg: #ffffff;      /* card background */
--border: #e5e7eb;       /* borders */
--text: #111827;         /* main text */
--text-muted: #6b7280;   /* secondary text */
```

Change these to retheme the entire app at once.

---

### 8. Add a new tab
1. In `index.html`, add a `<button class="tab-btn">` in the `<nav class="tab-nav">` section
2. In `index.html`, add a `<div id="panel-mytab" class="panel">` in the `<main>` section
3. In `app.js`, add `if (id === 'mytab') renderMyTab();` inside `switchTab()`
4. Write the `renderMyTab()` function in `app.js`

---

## Tabs & buttons — full overview

### Navigation tabs

| # | Tab | Function |
|---|-----|----------|
| 1 | **Home** | Dashboard with stats: streak, progress, verb/vocab/sentence counts. Shows "continue where you left off" button linked to active unit. |
| 2 | **Leerplan** | Full lesson plan (A1–B2, 18 units across 24 weeks). Each unit has grammar topics, verb focus, vocab topics, and sentence exercises. Clickable links navigate to other tabs with correct filters. |
| 3 | **Grammatica** | Grammar reference cards organized by level (A1–B2). Topics like pronouns, negation, word order, passive voice, etc. Each topic has explanation + examples. |
| 4 | **Zinnen oefenen** | Sentence practice exercises. Filterable by level and grammar type (vraagzin, niet/geen, bijzin, passief, tijden, etc.). |
| 5 | **Werkwoorden** | Verb hub with: search bar, type filters (modal/irregular/regular/separable/reflexive), verb chips to select a verb, then two modes: **Uitleg & vervoeging** (conjugation table) or **Oefenen** (type-the-answer practice). Also has **Betekenis oefenen** quiz (NL→EN / EN→NL / Mix). Unit dropdown "Kies een unit" filters verbs by the unit's verbRange. |
| 6 | **Niet & Geen** | Two exercises: (1) Choose geen or niet, (2) Place "niet" in the correct position. Plus a bilingual quick reference card. |
| 7 | **De / Het** | Article practice — shown a noun, pick "de" or "het". Filterable by level (A1–B2). Tracks correct/wrong/remaining. Shows completion screen with score. |
| 8 | **Woordenschat** | Vocabulary flashcards/lists filterable by level and topic (begroeting, familie, eten, huis, etc.). Practice mode: reveal translation, self-grade, score at end. |
| 9 | **Alle zinnen** | Browse all sentences in the database. |
| 10 | **Bewerken** | Edit mode for adding/modifying content. |

### Header buttons

| Button | Function |
|--------|----------|
| **🔥 Streak badge** | Shows daily practice streak count |
| **Opslaan** | Saves all progress to localStorage |

### Unit system

- When a unit is active (from leerplan or unit bar dropdown), **all tabs filter** to that unit's content: verbs filter to verbRange, vocab to unit topics, de/het to unit level, sentences to unit grammar type.
- Each tab shows a **unit bar** at the top: unit chip + title, step navigation ("Next →"), progress checkboxes (Woorden, De/Het, Zinnen, Werkwoorden), and a clear (✕) button.
- **"Kies een unit"** dropdown appears when no unit is active.

---

## How user progress is saved
Everything is saved in the browser's `localStorage` (no account needed). Keys used:

| Key | What it stores |
|---|---|
| `schrijfcoach_stats` | Correct/wrong counts per sentence |
| `schrijfcoach_flags` | Starred sentences and comments |
| `schrijfcoach_streak` | Daily practice streak |
| `schrijfcoach_srs` | Spaced repetition schedule per sentence |
| `schrijfcoach_sentences` | Custom sentences added by the user |
| `schrijfcoach_unit_progress` | Which unit exercises are marked done |
| `schrijfcoach_grammar_read` | Which grammar topics the user has marked as studied |
| `schrijfcoach_last_position` | Last unit + tab the user was actively studying |

To reset everything: open browser DevTools → Application → localStorage → delete all `schrijfcoach_*` keys.

---

## Grammar progress tracking

Each grammar topic card (in the Grammatica tab) has two action buttons in the top-right corner:

- **"Mark as studied"** — click to mark that topic as learned. Turns green (✓ Studied) and saves to `schrijfcoach_grammar_read`. The Home screen shows `X/Y geleerd` so you can see overall grammar progress at a glance.
- **"Practice sentences" / "Practice mistakes (N)"** — jumps directly to the Oefening tab filtered to sentences of that grammar type. If you have errors on those sentences, the button turns yellow and shows the error count. This allows targeted re-practice of weak grammar spots.

The Home screen grammar stat shows: `X/Y geleerd · N fout` (topics studied / total · sentences with more wrong than correct answers).

---

## De/Het exercise — completion behaviour

The De/Het tab no longer loops infinitely. Instead:

- A **"Resterend"** counter in the score row shows how many words are left in the current set.
- When the last word is answered, a **completion screen** appears showing correct / wrong / % score and total words practiced.
- The only way to go again is the **"Opnieuw beginnen"** button, which reshuffles the set and resets the score.
- Switching levels also resets the score and starts fresh.

---

## Guided lesson plan navigation

The app guides you step-by-step through each unit. Every exercise tab shows a **unit bar** at the top when a unit is selected.

### Unit bar
When a unit is active the bar shows:
- Unit number, level, and title
- **Step X of Y: [current step]** — so you always know where you are
- **"Next: [step name] →"** button — one click to go to the next activity
- **"✕"** to exit the unit filter

### "Next step →" buttons on completion screens
After finishing each activity, a **"Next: [step name] →"** button appears automatically (only when a unit is active):

| Where | When it appears |
|---|---|
| Grammar card | After clicking "Mark as studied" (navigates after 0.6 s) |
| Sentence exercise | On the "Goed gedaan!" congrats screen |
| Vocabulary practice | On the score screen after finishing all words |
| De/Het exercise | On the completion screen after finishing all words |

When you finish the **last step** of a unit, all buttons say **"✓ Unit done · See plan"** and take you to the lesson plan.

### Step order
Steps are derived from the `activities` array in each lesson plan unit. The order of `type` values determines the sequence:
- `"grammatica"` → Grammatica tab
- `"zinnen"` → Oefening (sentences) tab
- `"werkwoorden"` → Werkwoorden tab
- `"woordenschat"` → Woordenschat tab
- `"dehet"` → De/Het tab

---

## Tracking where you left off

The app remembers your last study position across sessions using `schrijfcoach_last_position`.

### Home dashboard — "Doorgaan" bar
When you have a study history, the bar at the top of the Home tab shows:
- The unit you last worked on (level badge + unit number + title)
- The next incomplete step (e.g. `Next: Grammar`)
- **"Continue [step] →"** button — sets that unit as active and jumps straight to the right tab
- **"Leerplan"** button to browse all units

If no unit history exists yet, it shows a prompt to pick a unit from the lesson plan.

### Lesson plan — "You are here" marker
When you open the Leerplan tab:
- Your current unit is highlighted with a **green left border**
- A `▶ You are here — Next: [step]` label appears above it
- The unit's button changes to **"Continue: [step] →"**
- The page **auto-scrolls** to that unit

### What updates the position
| Action | Saves position |
|---|---|
| Selecting a unit | Yes — saves first incomplete step |
| Clicking "Next step →" anywhere | Yes — saves the new step |
| Marking a grammar topic as studied | Yes — saves next step after grammar |

---

## Restructuring decisions

### Hebben of zijn? moved to A1 (2026-03-21)
The grammar topic **"Hebben of zijn? (VTT)"** (`id: "hebben-of-zijn"`) was moved from A2 to A1:
- Its `level` was changed from `"A2"` to `"A1"` in `grammarTopicsData`
- It now appears before the `// ══ A2 ══` divider in `grammar-data.js`
- In the lesson plan it was moved from **Unit 8 (Week 15–16, A2)** to **Unit 3 (Week 5–6, A1)**, where movement verbs like `gaan` and `fietsen` are first introduced — making it the natural moment to learn whether those verbs use *zijn* in the perfect tense.

---

## Prompt to rebuild this kind of app

Use this prompt with an AI assistant (Claude, ChatGPT, etc.) to build a similar language learning app from scratch:

```
Build a single-file (or small multi-file) browser-based language learning app
in plain HTML, CSS, and JavaScript — no frameworks, no backend, no installation.

The app should have:

TABS / SECTIONS:
- Home dashboard with progress stats
- Vocabulary flashcards (filterable by level A1/A2/B1/B2 and topic)
- Sentence translation exercise (type the answer, get feedback)
- Grammar reference (structured explanations with tables and examples)
- Verb conjugation tool (show full conjugation table + typing practice)
- De/Het article practice (pick the right article, get grammar reason)
- Lesson plan (structured units, each linking to the relevant exercises)

DATA STRUCTURE:
- sentences: [{nl, en, level, stype, srule}]
- vocabulary: [{nl, en, type, level, topic}]
- verbs: [{nl, en, forms: {present, past, participle}, auxiliary}]
- grammar: [{id, level, title, intro, tables, rules, examples, tip}]
- lessonPlan: units with grammarTopics, verbFocus, vocabTopics per unit

FEATURES:
- Filter all exercises by unit (when a unit is selected, all tabs filter to that unit's content)
- Progress tracking per sentence (correct/wrong counts) saved in localStorage
- Spaced repetition: sentences due for review shown first
- Daily streak counter
- Unit progress checklist: mark each exercise type (vocab/de-het/sentences/verbs) as done
- Vocabulary practice mode: flashcard-style, go through unit words one by one, grade each, show score at end
- Grammar explanations bilingual (Dutch + English)

STYLE:
- Clean, minimal design with a fixed header and scrollable content
- Color-coded level badges (A1=green, A2=blue, B1=orange, B2=purple)
- Mobile-friendly with wrapping flex layouts
- CSS custom properties for easy retheming

Start with the data structure and one working tab, then build the others one by one.
```

---

## What to be clearer about next time

When giving instructions to build this type of app, these details make the biggest difference:

### 1. Define your data model first
Before writing any code, write out exactly what one sentence, one vocabulary word, and one verb looks like as a JavaScript object. This sets the foundation for everything else.

**Be clear about:** What fields do you need? What are the allowed values? Are levels "A1" or "beginner"?

### 2. Describe the unit system explicitly
The hardest part of this app was making all tabs filter together when a unit is selected. You need to say upfront:
> "When I select Unit 1, I want ALL tabs (vocabulary, sentences, de/het, verbs) to show only Unit 1 content automatically."

**Be clear about:** Does selecting a unit replace the level filter, or work alongside it?

### 3. Specify the practice flow
For the vocabulary practice mode, the original description was unclear. A clear version:
> "Show one word at a time. Hide the translation. The student clicks 'Show translation', then clicks 'I know it' or 'I don't know it'. After the last word, show a score screen with correct/wrong counts and a button to restart."

**Be clear about:** What triggers the end? What is shown at the end? Can the student redo it?

### 4. Decide on progress persistence upfront
Say whether progress should be saved between sessions:
> "Progress (correct/wrong answers, streak, which units are done) should be saved in localStorage so it persists when the user closes and reopens the browser."

### 5. Describe the scoring/feedback behavior
> "When the student types a wrong answer, show the correct answer in red. Add this sentence to an 'errors' list. Allow filtering to only practice errors."

---

## How to build this yourself (step by step)

1. **Start with data** — Write `data.js` with 10 sentences, 20 vocabulary words, 5 verbs
2. **Build the shell** — Create `index.html` with a nav bar and empty panels, `styles.css` with variables
3. **One tab at a time** — Build vocabulary display first (simplest: just render cards from the array)
4. **Add filtering** — Add level/topic buttons that filter the array and re-render
5. **Build the exercise** — Sentence practice: show English, user types Dutch, compare and score
6. **Add localStorage** — Save and load stats after each answer
7. **Add the unit system** — A global `activeUnit` variable that all tabs read when filtering
8. **Polish** — Progress bars, streaks, spaced repetition, lesson plan

**Tools you need:** A text editor (VS Code), a browser, and basic HTML/CSS/JavaScript knowledge. No npm, no build tools, no server — just open `index.html` in a browser.

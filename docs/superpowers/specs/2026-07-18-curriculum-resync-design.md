# Curriculum resync: vocabulary, grammar & reading

## Problem

`lessonPlanData` (js/grammar-data.js) links grammar topics, vocabulary topic
groups, verb ranges and reading texts into 18 weekly units. An audit found:

- 15 of 39 reading texts (all `r-a2-0[09-23]`) are not assigned to any unit —
  the study plan never sends learners to them.
- 68 of ~130 vocab (level, topic) groups are never scheduled by any unit,
  including large B1 groups like `gezondheid` (41 words) and `samenleving`
  (28 words).
- A1 has 0 reading texts assigned across all 3 units — new readers get no
  reading practice until A2.
- Where units do reference readings, there's no guarantee the reading's
  content actually uses that unit's grammar point or vocabulary.

Root cause: units were grown incrementally (grammar-first) while vocabulary
and readings were added later without going back to re-link them.

## Goal

Redesign the unit map so every unit is a themed set: 1 life theme, 1-3
grammar topics that fit it, the vocab topic-groups for that theme, and
reading texts that demonstrate both. Scope: A1-B2 only (matches the app's
"A1 tot B1" tagline in `index.html` header — see note below). C1/C2
vocabulary (~400 words) stays reachable via Woordenschat but outside the
plan; out of scope for this change.

## Approach

**Grammar arc × themes.** Keep the existing grammar teaching order (it's
pedagogically sound — e.g. hebben/zijn before the BAGS rule, coordinating
before subordinating conjunctions). Attach each grammar topic to the life
theme it pairs with most naturally, so a unit's readings and vocabulary
reinforce the grammar point in context (e.g. reported speech lands in the
*media* unit; the conditional in the *climate* unit: "als we minder zouden
vliegen…").

Rejected alternatives: pure grammar-first (A, minimal effort but leaves the
mismatch); pure theme-first (B, best per-unit coherence but breaks the
grammar progression learners are mid-way through).

## Unit map (20 units, A1→B2)

Pacing: 1 week/unit through B1 (14 weeks), 2 weeks/unit for B2 (12 weeks) —
26 weeks total, same "intensief" framing as today.

| # | Lvl | Theme | Grammar topics | Vocab topic groups | Readings |
|---|-----|-------|-----------------|---------------------|----------|
| 1 | A1 | Hallo! Jezelf voorstellen | persoonlijke-vnw, vraagwoorden, telwoorden | begroeting, familie, vraagwoorden | 2 new |
| 2 | A1 | Thuis & eten | lidwoorden-meervoud, verkleinwoorden | eten, huis, kleuren | 2 new |
| 3 | A1 | Mijn dag | bezittelijke-vnw, ontkenning, voorzetsels-a1 | tijd, kleding, lichaam, werkwoorden | 2 new |
| 4 | A1 | Onderweg & herhaling | hebben-of-zijn | vervoer, weer, dieren, bijvoeglijk | 2 new |
| 5 | A2 | Eten, winkelen & geld | bijvoeglijk-nw, object-vnw | eten, winkelen, geld, dagelijks | r-001, r-a2-001, r-a2-006, r-a2-017, r-a2-019 |
| 6 | A2 | Gezondheid & sport | vergrotende-trap | gezondheid, sport, hobby | r-a2-002, r-a2-009, r-a2-015, r-a2-007 |
| 7 | A2 | Vrije tijd & feest | nevenschikkende-vgw | cultuur, natuur, bijvoeglijk | r-002, r-a2-003, r-a2-004, r-a2-021, r-a2-023 |
| 8 | A2 | Wonen & onderweg | er-systeem, voorzetsels-a2 | reizen, toerisme, huis | r-003, r-004, r-a2-005, r-a2-010, r-a2-014, r-a2-016, r-a2-018, r-a2-020, r-a2-022 |
| 9 | A2 | Werk, school & routine | scheidbare-werkwoorden, onderschikkende-vgw-1, formeel-u | werk, onderwijs, technologie, communicatie | r-a2-008, r-a2-011, r-a2-012, r-a2-013 |
| 10 | B1 | Werk & carrière | betrekkelijke-bijzin | werk, financiën, uitdrukkingen | r-b1-c-001, r-b1-c-004 |
| 11 | B1 | Wonen & samenleving | lijdende-vorm | wonen, samenleving, architectuur | r-b1-001, r-b1-c-002 |
| 12 | B1 | Milieu & wetenschap | voorwaardelijke-wijs | milieu, natuur, wetenschap | r-b1-002 |
| 13 | B1 | Media & communicatie | indirecte-rede | media, communicatie, technologie | r-b1-004 |
| 14 | B1 | Gevoelens & gezondheid | onderschikkende-vgw-2 | gevoelens, psychologie, gezondheid, relaties | 2 new |
| 15 | B1 | Maatschappij | woordvolgorde-gevorderd | samenleving, politiek, verbinders | r-b1-003, r-b1-c-003 |
| 16 | B2 | Economie & werk | gevorderd-passief | economie, werk, financiën | r-b2-001 |
| 17 | B2 | Politiek & recht | formeel-zakelijk | politiek, recht, samenleving | 1 new |
| 18 | B2 | Onderwijs & wetenschap | partitief | onderwijs, academisch, wetenschap | r-b2-002 |
| 19 | B2 | Milieu & technologie | voltooide-voorwaardelijke | milieu, technologie, abstract | r-b2-003, r-b2-004 |
| 20 | B2 | Idioom & afronding | idioom | uitdrukkingen, collocaties, woordfamilie | 1 new |

Every existing reading text is assigned exactly once. Every vocab group with
≥1 word is assigned to the thematically closest unit (tiny 1-2 word groups
like `A1/cultuur`, `A1/reizen` fold into the closest theme rather than
getting their own line — they still show up in Woordenschat browsing).

**New reading texts needed: 10** (2 each for units 1-4, 2 for unit 14, 1
each for units 17 and 20). Written in the existing `reading-data.js` schema
(title/text/vocabulary/comprehension questions/grammarNotes), matching each
unit's grammar point and vocab list. IDs continue the existing per-level
counters (`r-a1-001`..`r-a1-008`, `r-b1-005`/`006`, `r-b2-005`).

**Note on the "freeze":** CLAUDE.md's reading-text freeze was already lifted
2026-05-17 per memory; this is additional confirmation these 10 are wanted.

## Data changes

- `js/grammar-data.js` — replace `lessonPlanData.levels[].units` (18→20
  units) with the new map above. Verb ranges (0-810) re-split proportionally
  across the 20 units, preserving existing `verbFocus` word lists per theme
  where they already fit (reassign obviously mismatched ones, e.g. move
  weather-adjacent verbs to unit 4).
- `js/reading-data.js` — append 10 new reading text objects.
- `js/app.js` — `UNIT_PROGRESS_KEY` storage: on load, if the stored progress
  keys don't match unit numbers 1-20 (i.e. old 18-unit progress), reset
  `unitProgress` to `{}` and show a one-time toast: "Leerplan is
  bijgewerkt — je unit-voortgang is opnieuw ingesteld." Stats, SRS, saved
  words (Mijn woorden) and reading history are untouched — they're keyed by
  sentence/word/reading id, not unit number.

## Verification

1. Re-run the content-audit script (scratchpad) against the new data:
   checks 1, 3, 5 (broken references) must be empty; checks 2, 4, 6 (orphans)
   should only list intentionally-excluded C1/C2 groups and nothing else.
2. Manual read-through of the 10 new texts for correctness (native-level
   Dutch, appropriate CEFR difficulty, grammar point actually present).
3. Load app locally, click through Leerplan tab for all 20 units, confirm
   rendering (no `undefined`, activities render, goals render).
4. Confirm unit-progress reset path: simulate old-format localStorage,
   reload, verify reset + toast, verify stats/SRS/mijn-woorden survive.

## Out of scope

- C1/C2 units — separate future decision per memory (parking lot).
- Rewriting existing reading texts for thematic fit — audit found no
  mismatches worth fixing beyond reassignment.
- Sentence data (`js/data.js`) `gtopic` tags — unaffected, already keyed to
  grammar topic ids which are unchanged.

# Curriculum resync: vocabulary, grammar & reading

## Problem

`lessonPlanData` (js/grammar-data.js) links grammar topics, vocabulary topic
groups, verb ranges and reading texts into 18 weekly units. An audit found:

- 15 of 39 reading texts (all `r-a2-0[09-23]`) are not assigned to any unit.
- 68 of ~130 vocab (level, topic) groups are never scheduled by any unit.
- A1 has 0 reading texts assigned across all 3 units.
- No guarantee a unit's readings actually use that unit's grammar/vocab.

## Goal

Redesign the unit map (grammar arc × themes, approach C, user-approved) so
every unit is a themed set: life theme + grammar topics + vocab groups +
matching readings. Scope A1–B2 only. C1/C2 vocab stays outside the plan.

## Unit map (20 units) — approved 2026-07-18

See prior version of this file (git history) for the full table. Summary:
A1 gets 4 units (was 3, 0 readings → 8 new), A2 gets 5 (was 4, all 27
existing texts placed), B1 gets 6 (was 5, 2 new texts for the
feelings/health unit), B2 gets 5 (was 6, 2 new texts: politics, idiom).

**New reading texts: 12** — `r-a1-001`..`r-a1-008` (new A1 level),
`r-b1-005`, `r-b1-006`, `r-b2-005`, `r-b2-006`.

## Data changes

- `js/reading-data.js` — append 12 new reading text objects (schema:
  id/title/titleEn/level/topic/topicEn/topicEmoji/wordCount/readMinutes/
  text/textEn/vocabulary[]/grammarNotes[]/questions[]).
- `js/grammar-data.js` — replace `lessonPlanData.levels[].units` (18→20
  units). Verb ranges (0–810) re-split evenly across 20 units (~40 each);
  `verbFocus` per unit auto-picked as 12 spaced-out verbs from within that
  unit's range via a one-off generator script (not shipped).
- `js/app.js` — unit-progress migration: if stored `unitProgress` keys
  don't fit 1–20, reset to `{}` and toast the user once.

## Verification

1. Content-audit script (checks broken/orphaned references) — must be
   clean except intentionally-excluded C1/C2 vocab groups.
2. Manual read of the 12 new texts.
3. Load app, click through all 20 Leerplan units.
4. Confirm progress-reset path preserves stats/SRS/Mijn woorden/history.

## Out of scope

C1/C2 units, rewriting existing reading texts, `js/data.js` sentence
`gtopic` tags (unaffected).

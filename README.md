# Schrijfcoach

A Dutch language learning app (A1–B2) that runs entirely in the browser — vocabulary,
grammar, verb conjugation, sentence practice, de/het drills, and graded reading texts,
organised into a 20-unit study plan.

> **This is an ongoing project.** It is built and maintained as a personal study tool and
> is worked on continuously — content, exercises, and features are added and reshaped as
> the learning progresses. Expect things to change, and expect rough edges. There is no
> release schedule, no stability guarantee, and no support commitment.

## Running it

Open `index.html` in a browser. That's the whole setup — no build step, no bundler, no npm,
no dev server.

For the read-aloud feature in the **Lezen** tab, use **Microsoft Edge**: its neural Dutch
voices are considerably better than the alternatives.

## How it's built

Vanilla HTML, CSS, and JavaScript — deliberately zero-dependency. All scripts are loaded in
order by `index.html` and share a single global scope; there is no module system.

| Path | Contains |
|------|----------|
| `js/data.js` | Sentences, verb conjugations, vocabulary, de/het words |
| `js/grammar-data.js` | Grammar reference and the study plan |
| `js/reading-data.js` | Reading texts |
| `js/app.js` | All application logic |
| `js/supabase-*.js` | Optional account sign-in and cross-device progress sync |
| `css/styles.css` | All styling (light and dark themes) |

Progress is stored in `localStorage` under `schrijfcoach_*` keys. Signing in additionally
mirrors that state to Supabase so progress follows you between devices; without an account
everything still works, purely locally.

`docs/supabase-schema.sql` holds the database schema. Row-level security restricts every row
to the user who owns it. The Supabase URL and anon key in `js/supabase-config.js` are public
by design and safe to ship in the browser — RLS is what protects the data.

See `DOCUMENTATION.md` for a fuller tour of the tabs and internals.

## Deployment

Static hosting on Vercel; a push to `master` deploys automatically.

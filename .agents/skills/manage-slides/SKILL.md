---
name: manage-slides
description: Write, edit, reorder, and register reveal.js training slides in docs/markdown/ (SFEIR School Theme deck). Use when creating or editing slide markdown files, building basic/code/multi-column/lab/title/speaker slides, adding English speaker notes, or wiring new files into docs/scripts/slides.js.
---

# Managing SFEIR School Slides

The `docs/` folder is a reveal.js deck powered by **sfeir-school-theme**. Markdown files in `docs/markdown/<module>/` are pure content — they render as slides **only** once their path is added to `docs/scripts/slides.js`. See `docs/AGENTS.md` for directory layout, pedagogical structure, and dev commands; this skill covers slide markup syntax and registration mechanics.

## Mental model

One `.md` file = one entry in `slides.js`, but it can render as **one or more** reveal.js slides:

- A bare file = 1 slide.
- Splitting the file with `##==##` = multiple sibling slides from that one file/registry entry (no extra `slides.js` line needed).
- Splitting _within_ a `tc-multiple-columns` slide with `##++##` = **columns side-by-side**, not extra slides.

Don't confuse these two separators — they look similar but do opposite things (siblings vs. columns).

## Workflow

1. Read 2–3 sibling files in the target module — match depth, tone, and classes already in use.
2. Load only the reference files needed for this task (table below).
3. Write/edit the slide markdown.
4. If you added/renamed/deleted/reordered a file → update `docs/scripts/slides.js` (not optional).
5. Run the verification checklist.

## Which references to load

Do **not** load every reference. Match the task, then `Read` only those files:

| Task                                                                                    | Load                                                     |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Unsure about `##==##` / `##++##` / fragments / `Notes:`                                 | [references/separators.md](references/separators.md)     |
| Adding, renaming, deleting, or reordering slide files                                   | [references/registration.md](references/registration.md) |
| Writing or reshaping a slide (basic, title, speaker, columns, siblings, lab, fragments) | [references/templates.md](references/templates.md)       |
| Picking or combining slide CSS classes / transition modifiers                           | [references/classes.md](references/classes.md)           |

**Typical combinations**

| Situation                                            | Load                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| Edit text/code on an existing slide (same structure) | none — siblings + this file are enough                     |
| New file in a module                                 | `registration.md` + the relevant section of `templates.md` |
| Convert a slide to multi-column                      | `separators.md` + multi-column section of `templates.md`   |
| New lab / exercise slide                             | `registration.md` + lab section of `templates.md`          |
| Reorder the deck only                                | `registration.md`                                          |

## Verification checklist

1. New/edited file registered in the correct module function in `docs/scripts/slides.js` (if a new file).
2. Every `##++##` is paired; every column closes before the next opens.
3. Images referenced exist under `docs/assets/images/<module>/`.
4. Speaker notes (if any) are in English, after the final separator.
5. Deck loads at `http://localhost:4242` (`npx nx start docs`) and the slide appears in the right position.

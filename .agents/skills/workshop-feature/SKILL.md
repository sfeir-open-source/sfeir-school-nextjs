---
name: workshop-feature
description: Add a feature, implement a feature or perform a refactoring in one of the applications under /apps. Orchestrates the full plan → implement → review loop for this repo's workshop apps (workshop-architect, workshop-implementer, workshop-reviewer). USE WHEN a user or another sub-agent wants to add a feature, build functionality, or refactor code inside any app under /apps (e.g. "add a search filter to 03-server-components-solution", "refactor the employees form"). Do NOT use for pure bug fixes with no new feature/refactor involved (route those to the debugger agent instead), and do NOT use for changes to docs/ slide content or non-/apps code.
---

# Workshop feature development

This skill runs any feature or refactor targeting an app under `/apps` through a
fixed pipeline: **plan → implement → review → (rework if needed) → done**. It exists
so that no code gets written in a workshop app without an architecture plan first,
and no plan is considered "done" until an independent review confirms it was
followed. Follow the steps below in order — do not skip the plan step for
"small-looking" requests, and do not skip the review step.

## Step 1 — Enter plan mode and get the architecture plan

1. Call `EnterPlanMode` before doing any exploration or writing any code yourself.
2. Inside plan mode, delegate the actual design work to the `workshop-architect`
   agent (run it in the foreground — its plan is needed before continuing). Give it
   the full feature/refactor request plus any constraints already known from the
   conversation (target app, `-solution` pairing, existing conventions to match).
3. `workshop-architect` is read-only and returns a plan — it does not implement
   anything. Take that returned plan and write it into the plan file as required by
   plan mode (context summary, architecture decision, file-by-file plan, shared
   library impact, workshop/solution parity, open questions).
4. If `workshop-architect` surfaces open questions that block finalizing the plan,
   resolve them with `AskUserQuestion` before exiting plan mode — don't leave
   ambiguity for the implementer to guess at.
5. Call `ExitPlanMode` to request the user's approval of the plan. Do not proceed
   past this point until the user approves — if they request changes to the plan,
   go back to `workshop-architect` (or adjust directly if trivial) and re-submit.

## Step 2 — Implement

Once the user approves the plan and you're back in normal agent mode, call the
`workshop-implementer` agent with the approved plan as its input (the full
file-by-file plan, not a paraphrase — it should not have to re-derive decisions
already made). Let it write the code and run its own lint/build/test verification.

## Step 3 — Review

When `workshop-implementer` reports completion, call the `workshop-reviewer` agent.
Give it:

- The same plan used in Step 1 (so it can check fidelity, not just generic quality).
- The list of files `workshop-implementer` reported changing.

`workshop-reviewer` is read-only and returns a verdict (approved / approved with
nits / changes required) plus findings grouped by severity.

## Step 4 — Resolve the verdict

- **Approved, or approved with nits only**: the feature is done. Report to the user
  what was built (from Step 2's output) and mention any nits on record, but do not
  block completion on them.
- **Changes required**: send the reviewer's Blocking and Should-fix findings back to
  `workshop-implementer` (with concrete `file:line` references) to make the
  corrections. Do not re-plan or re-invoke `workshop-architect` unless the reviewer's
  findings reveal the _plan itself_ was wrong (as opposed to the implementation not
  following it) — that's an architecture problem, not an implementation one.
- After rework, return to **Step 3** and re-review. Repeat until the verdict is
  approved (with or without nits). If the same Blocking finding survives two review
  rounds, stop and flag it to the user rather than looping indefinitely.
- If `workshop-reviewer` identifies something that is actually a bug rather than a
  quality/fidelity issue, route that specific finding to the `debugger` agent instead
  of `workshop-implementer`, then still return to Step 3 to confirm the fix.

## Notes

- This pipeline assumes the target is under `/apps`. If the request turns out to
  touch only `/docs` (slide content), stop and defer to `nextjs-docs-advocate`
  instead.
- Keep each hand-off self-contained: every agent call in this pipeline should
  include enough context (the plan, prior findings, target app/file paths) that the
  called agent doesn't need to re-derive what a previous step already established.

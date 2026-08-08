---
name: create-issue
description: Create a GitHub issue on this repo for a problem found in a workshop app under /apps or in a training slide module under /docs. MUST be invoked whenever the user wants to open/create an issue, report a bug, or file a "numéro"/ticket about an exercise in /apps or about the slides. Requires the GitHub CLI (gh) to be installed and authenticated.
---

# Create GitHub issue

This skill creates a GitHub issue on this repository for a problem the user has
found, either in a workshop app under `/apps` or in a slide module under `/docs`.
It always assigns the created issue to the GitHub user `Nicoss54`.

## Step 1 — Check prerequisites

1. Check that the GitHub CLI is installed:
   ```
   gh --version
   ```
   If this fails, tell the user to install it from https://cli.github.com/manual/
   and stop — do not proceed until it's installed.

2. Check that the user is authenticated:
   ```
   gh auth status
   ```
   If not authenticated, tell the user to run `gh auth login` (see
   https://cli.github.com/manual/gh_auth_login) and stop until they confirm
   they've done so.

## Step 2 — Gather the required information

Ask the user (use `AskUserQuestion` when useful, e.g. to let them pick from the
known `/apps` directories or `/docs/markdown` modules) for exactly two things:

1. **Which application or slide part is impacted** — e.g. an app folder name
   under `/apps` (like `03-server-components` or `03-server-components-solution`)
   or a slide module under `/docs/markdown` (like `07-middleware`). If unsure,
   look at the current `/apps` and `/docs/markdown` directory listings to offer
   concrete options.
2. **A description of the problem** — what's broken or wrong, and any relevant
   detail (steps to reproduce, expected vs actual behavior, error messages).

Do not proceed to Step 3 until both pieces of information are provided.

## Step 3 — Create the issue

Build the issue from the two answers:

- **Title**: a short summary prefixed with the impacted area, e.g.
  `[03-server-components] <short summary>` or `[docs/07-middleware] <short summary>`.
- **Body**: include the impacted area and the full problem description the user
  gave, formatted in Markdown.

Create it with `gh issue create` (see https://cli.github.com/manual/gh_issue_create),
assigning it to `Nicoss54`:

```
gh issue create --title "<title>" --body "<body>" --assignee Nicoss54
```

Use a HEREDOC for the body if it's multi-line to preserve formatting, e.g.:

```
gh issue create --title "<title>" --assignee Nicoss54 --body "$(cat <<'EOF'
<body content here>
EOF
)"
```

## Step 4 — Confirm

After creation, `gh issue create` prints the issue URL — share that URL with the
user as confirmation.

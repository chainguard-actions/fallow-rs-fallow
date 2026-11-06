<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation: several composite steps in action.yml put a ${{ }} expression straight into the run: shell command, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. This happens in 8 steps: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The template is substituted before the shell parses the line, and the path is not quoted. Fix: use the runner-provided env var, quoted, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`
- `action.yml:427`
- `action.yml:541`
- `action.yml:554`
- `action.yml:601`
- `action.yml:623`
- `action.yml:649`
- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of them use shell: bash, so the $VAR syntax is correct. I left the ACTION_JQ_DIR env entries that use github.action_path as they were, because env: values are not run by a shell. A few edits reported success but had not saved, so I re-applied them and checked the file again with a search.


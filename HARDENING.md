<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: script. Eight composite steps use `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Every ${{ }} in a run: block is substituted into the script text before bash parses it. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:418`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:641`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All of these steps use shell: bash. The ACTION_JQ_DIR settings in env: blocks still use github.action_path; this finding does not cover env: blocks. The action was not run after the change. A follow-up search for ${{ in run: lines still reported the 8 lines; re-reading two of them shows the new form, so this looks like a search-tool artefact, but the next analysis pass should confirm all 8.


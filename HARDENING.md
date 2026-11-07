<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a ${{ }} expression is placed directly in the shell command of run: blocks in the composite action. Every step that calls a helper script uses `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. This affects 8 steps: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the runner-provided env var, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used to run `bash ${{ github.action_path }}/action/scripts/<x>.sh`. They now run `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`, which uses the path the runner provides, in double quotes. All steps use shell: bash. ACTION_JQ_DIR still uses github.action_path, but that is inside env: blocks, which is the safe place for it. The first batch of edits was sent all at once and some of them overwrote each other, so I reapplied those one at a time. A search then confirmed all 8 lines are correct.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh, the value from the diff-file input (FALLOW_DIFF_FILE) now has newlines and carriage returns removed with tr -d '\n\r' before it is written to $GITHUB_ENV. The value is stored in a variable first, so the command substitution isn't nested inside another function's argument. Nothing changed in action.yml: passing the input through env: is already the safe pattern, and the problem was only in the script's write. I checked the other FALLOW_DIFF_FILE write, which uses _DIFF_PATH. That value comes from AUTO_DIFF_FILE, which the script builds from $PWD and the artifacts directory, and the artifacts-dir input is already rejected if it contains newlines. So that write was left alone.


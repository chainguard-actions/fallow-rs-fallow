<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is put directly into run: shell commands in action.yml. Every composite step calls its script with `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. This happens in 8 steps: Install fallow (install.sh, L411), Fallow branded token (broker-token.sh, L419), Run analysis (analyze.sh, L535), Check Code Scanning availability (check-code-scanning.sh, L547), Post PR comment (comment.sh, L592), Emit inline annotations (annotate.sh, L614), Job summary (summary.sh, L640) and Post review comments (review.sh, L674). The value is spliced into the script text before the shell runs, and the path is unquoted. Fix: use the runner-provided env var in quotes instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:535`
- `action.yml:547`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:674`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. ACTION_JQ_DIR env entries left as-is (env: blocks are not shell-interpolated).

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Fixed action.yml in two ways.

1. invalid-yaml: two lines from a previous pass were each merged with the next step's '- name:' line. The analyze and summary lines read `run:run: bash "..."  - name: ...`. Each is now a single `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, and the next step starts on its own line as before.

2. script-injection: the 'Check Code Scanning availability' and 'Post review comments' steps put `${{ github.action_path }}` straight into their run: lines. They now use the quoted runner variable instead: `bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"` and `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"`.

My first round of edits ran in parallel and two of the changes were lost, so I made those again one at a time. A search then confirmed all four run: lines are correct. Nothing was run to load or test the action.


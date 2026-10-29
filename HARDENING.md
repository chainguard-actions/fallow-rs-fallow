<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts a GitHub Actions expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The expression is substituted into the script text and is also unquoted. Fix: pass the path through env (for example `ACTION_PATH: ${{ github.action_path }}`) and run `bash "$ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:413`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:426`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, replaced 'run: bash ${{ github.action_path }}/action/scripts/X.sh' in all eight steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) with 'run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"'. The runner sets this variable for every composite step and all steps use shell: bash. Making the first edits at the same time corrupted two run: lines and left three unchanged. I repaired those lines, redid the rest one at a time and re-read the file to confirm it's correct. ACTION_JQ_DIR entries already sit in env: blocks and were left as they were. Not run or tested after the change.


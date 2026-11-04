<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the $GITHUB_ACTION_PATH runner variable, quoted.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Sub-rule (a): an expression is interpolated directly into the run: script of the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 bash steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used `run: bash ${{ github.action_path }}/action/scripts/<x>.sh`. They now use `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. The runner sets this variable to the same directory, so behaviour should not change. All of these steps are shell: bash, so the quoted $VAR syntax is correct. ACTION_JQ_DIR still gets github.action_path through the env: block, which is already the safe pattern. Nothing was run to test the change.


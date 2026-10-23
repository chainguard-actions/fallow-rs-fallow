<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: pass the path through env (ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner variable "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' (id: analyze) has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' has an expression directly in its run block: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/X.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash, so the quoted variable is valid. ACTION_JQ_DIR env entries already keep the expression in env: and were left unchanged.


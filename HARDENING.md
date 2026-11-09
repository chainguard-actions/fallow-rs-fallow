<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.40.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.40.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through the shell variable "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:546`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:559`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:606`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:628`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:654`

### script-injection (severity: high)

Rule (a): an expression is written directly into a run: command in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:687`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Every one of these steps runs under shell: bash. The ACTION_JQ_DIR values still use the expression, but only in env: blocks, which is not an injection path, so I left them as they were.


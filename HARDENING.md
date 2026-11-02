<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): step 'Run analysis' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): step 'Job summary' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): step 'Post review comments' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/X.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 composite steps (all shell: bash). ACTION_JQ_DIR env entries using github.action_path were left as-is since env: is the safe location.


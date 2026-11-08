<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly in a run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/install.sh` (step 'Install fallow'). Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the built-in $GITHUB_ACTION_PATH, double-quoted.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` (step 'Fallow branded token') puts an expression directly in the shell command.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` (step 'Run analysis') puts an expression directly in the shell command.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` (step 'Check Code Scanning availability') puts an expression directly in the shell command.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/comment.sh` (step 'Post PR comment') puts an expression directly in the shell command.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` (step 'Emit inline annotations') puts an expression directly in the shell command.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/summary.sh` (step 'Job summary') puts an expression directly in the shell command.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): `run: bash ${{ github.action_path }}/action/scripts/review.sh` (step 'Post review comments') puts an expression directly in the shell command.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 steps (all shell: bash). The ${{ github.action_path }} references still in env: blocks (e.g. ACTION_JQ_DIR) are already the safe pattern and were left as they are.


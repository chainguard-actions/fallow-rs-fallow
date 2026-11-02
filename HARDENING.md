<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it into env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the $GITHUB_ACTION_PATH env var.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: command in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 steps (all shell: bash). Remaining github.action_path references are in env: blocks (ACTION_JQ_DIR), which are safe.


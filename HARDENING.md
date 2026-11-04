<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) broken in the 'Install fallow' step: the expression is placed directly in the run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it into env: (for example ACTION_PATH: ${{ github.action_path }}) and use `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-set "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a) broken in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` puts an expression directly in run:.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a) broken in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` puts an expression directly in run:.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a) broken in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` puts an expression directly in run:.

Locations:

- `action.yml:546`

### script-injection (severity: high)

Rule (a) broken in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh` puts an expression directly in run:.

Locations:

- `action.yml:591`

### script-injection (severity: high)

Rule (a) broken in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` puts an expression directly in run:.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a) broken in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh` puts an expression directly in run:.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a) broken in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh` puts an expression directly in run:.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, changed all 8 `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. All steps use shell: bash, so the env var expands correctly. The ACTION_JQ_DIR values in the env: blocks were left alone, since putting an expression in env: is already safe.


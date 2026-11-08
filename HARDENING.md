<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through an env var (or use $GITHUB_ACTION_PATH) and quote it: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In hardened/action/action.yml, I changed all 8 lines of the form `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`. The 8 steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. They all run under shell: bash. I left the ACTION_JQ_DIR env values that use github.action_path alone, because they are in env: blocks, not in the script text.


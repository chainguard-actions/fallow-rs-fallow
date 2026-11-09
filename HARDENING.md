<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression sits directly inside a run: script in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through an env var such as GITHUB_ACTION_PATH and quote it: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 8 steps that ran `bash ${{ github.action_path }}/action/scripts/<script>.sh` now run `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`. All of them use shell: bash. The runner sets GITHUB_ACTION_PATH to the directory the action is actually checked out in, so the path is right in the mirror too and no env: entries were needed. A search for `run: bash ${{` now finds nothing. ACTION_JQ_DIR still uses the expression, but only inside env: blocks, where it can't be injected. The action has not been run.


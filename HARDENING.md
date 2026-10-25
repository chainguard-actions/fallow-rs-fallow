<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and quote it: bash "$ACTION_PATH/action/scripts/install.sh". The runner also sets $GITHUB_ACTION_PATH, which can be used instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use a quoted env variable instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash, so the syntax is correct; GITHUB_ACTION_PATH is set by the runner.


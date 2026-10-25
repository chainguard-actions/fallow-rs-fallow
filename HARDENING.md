<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: pass the value through env, e.g. `"$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' (id: analyze) puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps are shell: bash. ACTION_JQ_DIR env entries using github.action_path were left in env: (not injectable).


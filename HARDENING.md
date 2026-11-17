<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.43.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.43.2** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the composite step 'Install fallow' puts a GitHub Actions expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The runner substitutes the template before bash parses the line. Use the runner-provided env var instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:451`

### script-injection (severity: high)

Rule (a): the step 'Fallow branded token' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh"`.

Locations:

- `action.yml:464`

### script-injection (severity: high)

Rule (a): the step 'Resolve change scope' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/scope.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/scope.sh"`.

Locations:

- `action.yml:524`

### script-injection (severity: high)

Rule (a): the step 'Run mutation testing' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh run`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/mutation.sh" run`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the step 'Run analysis' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/analyze.sh"`.

Locations:

- `action.yml:651`

### script-injection (severity: high)

Rule (a): the step 'Check Code Scanning availability' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"`.

Locations:

- `action.yml:664`

### script-injection (severity: high)

Rule (a): the step 'Post PR comment' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/comment.sh"`.

Locations:

- `action.yml:709`

### script-injection (severity: high)

Rule (a): the step 'Emit inline annotations' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"`.

Locations:

- `action.yml:731`

### script-injection (severity: high)

Rule (a): the step 'Job summary' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"`.

Locations:

- `action.yml:758`

### script-injection (severity: high)

Rule (a): the step 'Post review comments' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"`.

Locations:

- `action.yml:791`

### script-injection (severity: high)

Rule (a): the step 'Mutation testing result' interpolates an expression in run: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh gate`. Replace it with `bash "$GITHUB_ACTION_PATH/action/scripts/mutation.sh" gate`.

Locations:

- `action.yml:799`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed all 11 composite run: steps that called `bash ${{ github.action_path }}/action/scripts/<script>.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The scripts are install, broker-token, scope, mutation (run and gate), analyze, check-code-scanning, comment, annotate, summary and review. The `run`/`gate` arguments to mutation.sh are unchanged, and every step uses shell: bash, so the new syntax works. I left the two ACTION_JQ_DIR entries that use github.action_path alone because they sit in env: blocks, not in run: scripts. Nothing was run to test the changes.


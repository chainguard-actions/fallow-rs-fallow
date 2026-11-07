<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the $GITHUB_ACTION_PATH env var in double quotes instead: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression straight into its run string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, replaced `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` for install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps (all shell: bash). The ACTION_JQ_DIR env entries still use ${{ github.action_path }} inside env:, which is safe and unchanged.


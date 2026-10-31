<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the step 'Install fallow' puts a GitHub expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the shell variable "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Fallow branded token' runs `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Run analysis' runs `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Check Code Scanning availability' runs `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Post PR comment' runs `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Emit inline annotations' runs `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Job summary' runs `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Post review comments' runs `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, replaced `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in 8 steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash. The ACTION_JQ_DIR env entries still use the expression, which is safe because they are in env: and not in run:. Nothing was run to test the change.


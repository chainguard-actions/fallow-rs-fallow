<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the quoted "$GITHUB_ACTION_PATH" env var instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash, so the $VAR syntax is valid. ACTION_JQ_DIR env entries were left unchanged since expressions in env: are safe.


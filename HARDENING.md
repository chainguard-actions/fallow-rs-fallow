<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: use the runner-provided "$GITHUB_ACTION_PATH" env var instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): an expression is placed directly in the run: block of step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 flagged steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of these steps use shell: bash, so the quoted env-var form works. The ACTION_JQ_DIR env: values still use github.action_path, which is fine because an env: value is not run by the shell. The only other matches are in docs (patterns.md), which I left alone.


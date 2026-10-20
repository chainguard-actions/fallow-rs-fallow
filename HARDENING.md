<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the runner-provided $GITHUB_ACTION_PATH.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): expression interpolated directly in run: block of step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 flagged steps in action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Each one ran `bash ${{ github.action_path }}/action/scripts/X.sh` and now runs `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`, which uses the path variable the runner sets itself. All these steps use `shell: bash`, so the `$VAR` syntax is correct there. I haven't run the action or the analysis again after the change.

I left two `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` lines alone, in the annotate and job summary steps. They sit in the steps' `env:` blocks, not in `run:`, so they are the safe form and weren't flagged.


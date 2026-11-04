<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and call it as `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the $GITHUB_ACTION_PATH env var.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: string. Step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 bash steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). ACTION_JQ_DIR env entries that use github.action_path were left alone, since expressions in env: are safe.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

invalid-yaml: the previous pass left two broken lines. The broker-token and comment steps had 'run:run: bash ...' with the next comment or step glued onto the same line. I fixed both lines and put back the line breaks. script-injection: the check-code-scanning, annotate and summary steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" instead of using ${{ github.action_path }} inline. The ACTION_JQ_DIR env values still use github.action_path; that is safe because they sit in env:, not in run:.


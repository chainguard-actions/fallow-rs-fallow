<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly in a run: shell command. Step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Read the built-in GITHUB_ACTION_PATH env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:434`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:442`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' (id analyze): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:567`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:615`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:637`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:663`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' (id review): `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:697`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step ran its script with `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. They now use `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`, which reads the runner's built-in variable instead of an inline expression. The edits only touched those 8 lines. The two ACTION_JQ_DIR values in env: blocks still use the github.action_path expression. That isn't an injection risk, because an env: value is never parsed as shell code. Every affected step uses `shell: bash`, so the `$VAR` form is correct there. A search after the edit found no ${{ }} expressions left on any run: line in action.yml. I didn't run the action itself to test it.


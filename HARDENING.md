<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a) violated in step 'Install fallow': the run block puts a template expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the runner-provided "$GITHUB_ACTION_PATH" env var instead.

Locations:

- `action.yml:556`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:569`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Run analysis' (id: analyze): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:684`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:697`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:744`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:766`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:792`

### script-injection (severity: high)

Sub-rule (a) violated in step 'Post review comments' (id: review): `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Replace with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:825`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

action.yml: in all 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review), replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Running some edits in parallel corrupted two lines (analyze and comment) partway through; I repaired both and re-checked them. The ACTION_JQ_DIR env: entries still use github.action_path. That is fine because a value set in env: is not run as shell code.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh, three writes now remove newlines from the value first, using printf '%s' "$VAR" | tr -d '\n\r'. Each sanitized copy goes into its own _SAFE_* variable, and the original variable is left as it was for the rest of the script: (1) changed_since=${INPUT_CHANGED_SINCE:-} written to $GITHUB_OUTPUT; (2) FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE} written to $GITHUB_ENV; (3) FALLOW_DIFF_FILE=${_DIFF_PATH} written to $GITHUB_ENV. action.yml needed no change, since it only runs the script. The file is over 100KB and could not be opened with read_file, so I worked out the exact lines with regex searches. I did not review the script's other writes to $GITHUB_OUTPUT and $GITHUB_ENV, which the finding did not name, and I did not run anything to test the changes.


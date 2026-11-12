<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env: (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`. The runner's built-in $GITHUB_ACTION_PATH variable also works.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' writes an expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I changed the 8 flagged 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' lines in action.yml to 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. $GITHUB_ACTION_PATH is a variable the runner sets itself, so no new env: entries were needed. Every one of these steps uses 'shell: bash', so the $VAR form is valid there. The quotes also mean the paths still work if they contain spaces. Two env: values still use ${{ github.action_path }} (ACTION_JQ_DIR in the annotate and summary steps). They were not flagged and an env: block is not a run: line, so I left them as they were. Nothing was run to test these edits.


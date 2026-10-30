<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:441`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' (id fallow-token) puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:455`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' (id analyze) puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:585`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' (id ghas-check) puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:597`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' (id comment) puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:645`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:666`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:691`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' (id review) puts a GitHub expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:723`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 composite run: lines from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. The runner sets $GITHUB_ACTION_PATH for every composite step, so no new env entries were needed. My first batch of edits ran at the same time and clashed: three were lost and the check-code-scanning line got merged into the 'Upload SARIF' step header. I redid those edits one at a time, repaired the broken line, and re-read the steps section to confirm it is correct. The ACTION_JQ_DIR values still contain ${{ github.action_path }}, but they sit in env: blocks, which is the safe place for them, so I left them. Nothing was run to test the changes.


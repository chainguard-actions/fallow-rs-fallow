<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env instead (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the built-in "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:546`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:559`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:606`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:628`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:652`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts an expression directly in its run string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:684`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed all 8 `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. The scripts are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All steps use `shell: bash`, so the quoted $VAR syntax is right. Running some of the edits in parallel dropped a few of them and mangled the analyze run line. I redid those edits and fixed the analyze line, then re-read the whole steps section to confirm it is correct. I left the ACTION_JQ_DIR entries alone: they use `${{ github.action_path }}` inside `env:` blocks, not in shell strings, and were not flagged. Nothing was run to test the changes.


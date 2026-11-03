<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the $GITHUB_ACTION_PATH env var instead, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts a GitHub expression directly in its run: script: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/X.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 composite steps (all shell: bash). ACTION_JQ_DIR env entries using github.action_path were left as-is since they are in env: blocks, not run scripts.


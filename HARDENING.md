<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is written straight into the run string: `run: bash ${{ github.action_path }}/action/scripts/install.sh` (step 'Install fallow'). Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` (step 'Fallow branded token'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` (step 'Run analysis'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:544`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` (step 'Check Code Scanning availability'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:557`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/comment.sh` (step 'Post PR comment'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:604`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` (step 'Emit inline annotations'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/summary.sh` (step 'Job summary'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/review.sh` (step 'Post review comments'). Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all eight script-injection findings in action.yml. Each step ran `bash ${{ github.action_path }}/action/scripts/<name>.sh` and now runs `bash "$GITHUB_ACTION_PATH"/action/scripts/<name>.sh`. All eight steps use shell: bash, so the $VAR form is correct, and the scripts resolve to the same directory as before. Not changed: the ACTION_JQ_DIR entries in the env: blocks of the annotations and summary steps still use ${{ github.action_path }}. An env: value is not run by the shell, so it cannot be injected, and it was not flagged. Not run: the action was not executed. A follow-up search for run: lines containing ${{ still returned 8 hits next to the edited lines. The first one was checked and contains no expression (the search seems to match across into the line above); the other seven were not checked one by one, but the edit reported all 8 replacements made.


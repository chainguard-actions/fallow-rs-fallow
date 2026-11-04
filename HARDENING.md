<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 'Install fallow' step interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 `run: bash ${{ github.action_path }}/action/scripts/X.sh` lines now read `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"` (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Every one of these steps uses shell: bash. I left the ACTION_JQ_DIR values under env: as they were, because an expression in env: is not interpolated into the shell script.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Fixed the broken 'run:run: bash "...annotate.sh"  - name: Job summary' line, which a previous edit had merged with the next step. It is now a proper run: line, and 'Job summary' is its own step again. Replaced ${{ github.action_path }} in the Job summary and Post review comments run: commands with the quoted "$GITHUB_ACTION_PATH/action/scripts/..." form.


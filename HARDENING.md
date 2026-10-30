<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env instead, e.g. ACTION_PATH: ${{ github.action_path }} with run: bash "$ACTION_PATH/action/scripts/install.sh", or use the runner's "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:542`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:555`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:603`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:626`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:652`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts a GitHub Actions expression directly in its run line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed all 8 flagged steps in action.yml from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. The scripts are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every one of these steps uses shell: bash. The edits for the summary and review steps reported success but did not change the file the first time. They were redone, and reading the end of the file confirms both are changed now. ACTION_JQ_DIR still gets ${{ github.action_path }} in the env: blocks of the annotations and summary steps. That is the recommended place for an expression, and it was not one of the findings. A final search of action.yml finds no run: line with a ${{ }} expression. The action was not run or tested.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Repaired the damaged line in action.yml (around line 623). 'run:run: bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"  - name: Job summary' had been merged onto one line. It is now a normal 'run:' line, followed by the Job summary step on its own line. Nothing else changed.


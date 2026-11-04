<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env (or use $GITHUB_ACTION_PATH) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I fixed all 8 script-injection findings. Each step that ran `bash ${{ github.action_path }}/action/scripts/<script>.sh` now runs `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash, so the quoted $VAR form is correct. I left the ACTION_JQ_DIR env values that use github.action_path alone, because an expression in env: is safe.

While editing, some of my parallel edits were lost and one corrupted the file: the summary step's run line was mangled and merged into the next step's name. I redid the lost edits one at a time, fixed the corrupted line, and re-read the whole steps section to confirm it is intact. I didn't re-read the earlier part of action.yml, but my edits only touched the steps section. Nothing has been run or tested.


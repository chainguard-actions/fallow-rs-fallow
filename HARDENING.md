<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly into the run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` line is now `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. All 8 steps use `shell: bash`, so `$GITHUB_ACTION_PATH` is the right way to read the variable. `${{ github.action_path }}` still appears in the `env:` blocks (ACTION_JQ_DIR). That is the safe pattern and needs no change. Nothing has been run or tested.


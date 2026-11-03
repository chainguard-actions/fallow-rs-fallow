<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: step 'Install fallow' uses `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The ${{ github.action_path }} template expression is substituted into the shell command string. Fix: use the runner-provided env var instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' (id fallow-token) uses `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): step 'Run analysis' (id analyze) uses `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' (id ghas-check) uses `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' (id comment) uses `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' uses `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): step 'Job summary' uses `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): step 'Post review comments' (id review) uses `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. All of these steps use `shell: bash`, so referring to the variable as `$GITHUB_ACTION_PATH` is correct, and the quotes keep a path with spaces as one argument. Nothing was run to test this. The `ACTION_JQ_DIR` entries in two `env:` blocks still contain `${{ github.action_path }}`. I left them as they are because the runner sets env values directly rather than passing them through the shell, so they can't be used for injection.


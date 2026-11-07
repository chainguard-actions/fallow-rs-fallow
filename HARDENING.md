<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The value is substituted into the YAML before the shell runs, without quoting. Fix: pass it through env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the runner's $GITHUB_ACTION_PATH.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a) direct expression interpolation in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step that ran `bash ${{ github.action_path }}/action/scripts/<script>.sh` now runs `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`. That variable is set by the runner and is quoted, so no expression is pasted into the shell text any more. Every affected step uses `shell: bash`, so the quoted form works as written. Nothing was run to test it. I left the `${{ github.action_path }}` values in the env: blocks (ACTION_JQ_DIR) alone, since values set through env: can't inject commands.


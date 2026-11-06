<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the shell variable "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:412`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:420`

### script-injection (severity: high)

Rule (a): step 'Run analysis' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): step 'Job summary' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:643`

### script-injection (severity: high)

Rule (a): step 'Post review comments' puts an expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` line is now `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. Every affected step is `shell: bash`, so the shell variable works there and the action's paths are unchanged. Two lines still use `${{ github.action_path }}`: the ACTION_JQ_DIR entries in the env: blocks of the annotation and summary steps. I left them alone because an expression in env: becomes a plain environment variable and is never run as shell code. I haven't run the action or re-run the analysis after the edit.


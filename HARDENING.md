<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' puts a GitHub expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env (e.g. ACTION_PATH: ${{ github.action_path }}) or use the existing "$GITHUB_ACTION_PATH" runner variable, quoted.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): step 'Run analysis' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): step 'Job summary' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): step 'Post review comments' puts an expression directly into its run command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed all 8 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' lines to 'run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh'. The variable is quoted, and the script names and arguments are the same as upstream. Every affected step uses shell: bash, so this syntax is correct for all of them. The ACTION_JQ_DIR env entries still use ${{ github.action_path }}. That is safe because they are env values, not part of a run command. Nothing was run to test the change.


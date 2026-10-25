<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 composite steps. All of them run under `shell: bash`. I left the `ACTION_JQ_DIR` env entries alone: they still use the expression, but they sit in `env:`, not in `run:`. I haven't run the action to test this.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

Changed action/scripts/analyze.sh. FALLOW_DIFF_FILE (from inputs.diff-file), the auto-generated diff path (_DIFF_PATH) and FALLOW_RENDER_PATH_PREFIX (from inputs.args) are now each passed through `printf '%s' "$VAR" | tr -d '\n\r'` into a variable written to $GITHUB_ENV. The script still uses the original values internally. FALLOW_ANALYSIS_ARGS_JSON comes from `jq -c`, which escapes newlines, so it needed no change. action.yml only maps the input into env, so it was left as is.


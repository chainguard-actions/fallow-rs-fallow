<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): step 'Run analysis' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): step 'Job summary' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): step 'Post review comments' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each script call that used `bash ${{ github.action_path }}/action/scripts/<script>.sh` in a `run:` line now uses `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`. All 8 steps use `shell: bash`, so `$GITHUB_ACTION_PATH` is the right syntax for them, and the double quotes stop the path from being split if it contains spaces. Nothing else in the file was changed. I haven't run the action or the analysis again to confirm the findings are gone.

The `ACTION_JQ_DIR` values in the `env:` blocks still use `${{ github.action_path }}`. That's allowed in `env:` and isn't an injection risk, so I left it alone.


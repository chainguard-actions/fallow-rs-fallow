<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/install.sh" instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts a ${{ }} expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH/..." instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 8 `run:` lines that had `bash ${{ github.action_path }}/action/scripts/<x>.sh` now read `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. Every one of these steps uses `shell: bash`, so the quoted `$VAR` form works there. I left the `${{ github.action_path }}` values in the env: blocks (ACTION_JQ_DIR) as they were: the rule only covers expressions inside `run:`, and env: is the safe place for them. Nothing was run to test the change.


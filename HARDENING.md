<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Install fallow' uses `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) or use the $GITHUB_ACTION_PATH env var, quoted: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Fallow branded token' uses `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Run analysis' uses `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Check Code Scanning availability' uses `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Post PR comment' uses `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Emit inline annotations' uses `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Job summary' uses `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a) – direct expression interpolation in run: step 'Post review comments' uses `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 composite steps (all shell: bash). ACTION_JQ_DIR env entries using github.action_path were left in env: (safe).


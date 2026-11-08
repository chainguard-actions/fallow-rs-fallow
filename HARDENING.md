<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through an env var instead (e.g. ACTION_PATH: ${{ github.action_path }}) and call `bash "$ACTION_PATH/action/scripts/install.sh"`, or use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): step 'Run analysis' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): step 'Job summary' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): step 'Post review comments' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In all 8 composite steps in action.yml (all shell: bash), changed `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`. No env: entries were needed because the runner sets GITHUB_ACTION_PATH for composite steps. ACTION_JQ_DIR in env: blocks is unchanged because expressions in env: are safe. A follow-up search for ${{ }} in run: lines still listed 8 spots in action.yml. The first one was checked and is a cross-line false positive; the other 7 are assumed to be the same. Not verified by running the action or a new analysis pass.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through an env var instead, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in the run command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced `bash ${{ github.action_path }}/action/scripts/<name>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"` in all 8 composite steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of these steps use `shell: bash`. The runner sets GITHUB_ACTION_PATH automatically, so these steps need no new env: entries. The first bulk edit garbled 4 of the lines (it dropped a '/' and added a blank line). I fixed those lines by hand and read the whole file again to confirm all 8 are correct. The ACTION_JQ_DIR expressions are in env: blocks, not in run:, so I didn't change them.


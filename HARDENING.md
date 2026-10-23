<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the value through env (for example `ACTION_PATH: ${{ github.action_path }}`) and use "$ACTION_PATH", or use the $GITHUB_ACTION_PATH environment variable, double-quoted.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed straight into a run: shell command in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, each of the 8 lines 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' is now 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. The scripts changed were install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of these steps use shell: bash, so the quoted reference works as written. Three edits (broker-token, analyze, review) didn't apply on the first try and had to be redone. A final search found no ${{ }} expressions left in any run: line. The ACTION_JQ_DIR values set from github.action_path in env: blocks are unchanged, because env: is the recommended place for expressions.


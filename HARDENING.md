<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass github.action_path through env (or use $GITHUB_ACTION_PATH) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 bash steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). ACTION_JQ_DIR env entries referencing github.action_path are in env: blocks and left unchanged.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

invalid-yaml: action.yml had two corrupted lines. (1) In the 'Fallow branded token' step, `run:run: bash ...broker-token.sh` was joined onto the next comment. (2) In 'Job summary', `run: basrun: bash ...summary.sh` was joined onto `name: Post review comments`. I put both back as clean single-line run commands, with the following comment and step on their own lines again. My first fix to the Job summary line said it worked but hadn't saved, so I made it again and read it back. script-injection: the 'Check Code Scanning availability' step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"`.


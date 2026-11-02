<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it in through env instead, e.g. use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed directly in a run: block in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step had `run: bash ${{ github.action_path }}/action/scripts/<name>.sh`, and each now has `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<name>.sh`. GITHUB_ACTION_PATH is a variable the runner already sets for every step, so nothing needed adding to env:. All the affected steps use shell: bash, so this way of reading the variable works. I left the ${{ github.action_path }} values inside env: blocks (ACTION_JQ_DIR) alone, because the findings don't cover them. Nothing has been run to test this.


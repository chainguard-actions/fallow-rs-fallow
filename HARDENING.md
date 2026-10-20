<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use bash "$GITHUB_ACTION_PATH/action/scripts/install.sh" instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. Every step uses shell: bash, so this form works. Some of the edits merged adjacent lines into one; I repaired those and checked the YAML structure. The env: entries ACTION_JQ_DIR: ${{ github.action_path }}/action/jq are still there. That is fine because env: is the intended place for expressions.


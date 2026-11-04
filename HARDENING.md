<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed 8 run lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use shell: bash. I left the ACTION_JQ_DIR env entries alone because they sit in env: blocks, which is the safe place for an expression.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

action.yml: invalid-yaml: in the 'Post PR comment', 'Emit inline annotations' and 'Job summary' steps, the run: line was indented too far and ran into the next step's '- name:' on the same line. Each run: is back at step indentation and each following step has its own line. The annotations edit did not save the first time and was applied again. script-injection: 'Install fallow' and 'Fallow branded token' now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" instead of the inline ${{ github.action_path }} expression; both steps use bash. Checked by reading the file back and searching it; no YAML parser or tests were run.


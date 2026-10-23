<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the 'Install fallow' step puts a GitHub Actions expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: use the $GITHUB_ACTION_PATH env var instead, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): the 'Fallow branded token' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): the 'Run analysis' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): the 'Check Code Scanning availability' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): the 'Post PR comment' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): the 'Emit inline annotations' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): the 'Job summary' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): the 'Post review comments' step puts an expression directly into a run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 bash steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). ACTION_JQ_DIR env entries left as-is (env block, not shell).

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

The 'Install fallow' and 'Check Code Scanning availability' steps now run their scripts with bash "$GITHUB_ACTION_PATH/action/scripts/..." instead of putting ${{ github.action_path }} in the run: command. I also fixed invalid YAML left by an earlier edit: in the annotate and summary steps the run: lines read 'bashbash' and had the next step's '- name:' joined onto the same line. Each is now a plain 'bash "$GITHUB_ACTION_PATH/..."' line, with its next step on its own line.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed broken YAML in action.yml: the run: lines for the 'Emit inline annotations' and 'Job summary' steps had too much indentation, and their next lines had been merged onto one line ('- name: Job summary   if: ...' and '- name: Post review comments   id: review'). Each key now sits on its own correctly indented line. No other changes.


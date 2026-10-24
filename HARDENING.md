<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression sits directly inside a run: shell command. Eight composite steps use `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The value is substituted into the script text before the shell runs. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all eight composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use bash, so the quoted form works the same way. The two ACTION_JQ_DIR lines still contain the expression, but they sit in env: blocks, which is the safe pattern, so I left them alone. I didn't run the action after the edit.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed the 6 flagged steps in action.yml (broker-token, analyze, check-code-scanning, comment, annotate, summary). Each one changed from 'run: bash ${{ github.action_path }}/action/scripts/X.sh' to 'run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"'. All of these steps use shell: bash, so the $VAR form works. The first try at the annotate and summary edits didn't save, so I made them again and checked with search. Now no run: line in action.yml has a ${{ }} expression, and all 8 script calls use the quoted variable (install.sh and review.sh already did). I left ACTION_JQ_DIR alone: its expression is in env:, which is the safe place for it.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed a broken line in action.yml. The 'Run analysis' step's run: was indented 10 spaces instead of 6, and the next step ('- name: Check Code Scanning availability') was stuck onto the end of the same line. That made YAML fail with 'mapping values are not allowed'. I put run: back at step-key indentation and moved the ghas-check step onto its own line. The script it points to, action/scripts/analyze.sh, exists.


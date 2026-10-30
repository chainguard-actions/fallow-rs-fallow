<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a), an expression placed directly in a run: string. Eight composite steps in action.yml put `${{ github.action_path }}` straight into the shell command. These are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Example: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The value is pasted into the script text before the shell runs it, and it is not quoted. Use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed eight composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Each one ran `bash ${{ github.action_path }}/action/scripts/X.sh` and now runs `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use shell: bash. Two env: entries (ACTION_JQ_DIR) still use the github.action_path expression. Values in env: are not pasted into the script, so they are safe and I left them alone.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Changed the 'Check Code Scanning availability' and 'Post review comments' steps to call bash "$GITHUB_ACTION_PATH/action/scripts/..." instead of interpolating ${{ github.action_path }}. Fixed the broken YAML in the 'Post PR comment' step: it read 'run:run: ...' and the next step's '- name:' line was stuck onto the same line. The run line is now correct and 'Emit inline annotations' starts on its own line again.


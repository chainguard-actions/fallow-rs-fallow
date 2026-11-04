<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): eight composite steps put a GitHub Actions expression straight into the run: shell string, in the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The affected steps are 'Install fallow' (install.sh), 'Fallow branded token' (broker-token.sh), 'Run analysis' (analyze.sh), 'Check Code Scanning availability' (check-code-scanning.sh), 'Post PR comment' (comment.sh), 'Emit inline annotations' (annotate.sh), 'Job summary' (summary.sh) and 'Post review comments' (review.sh). The template value is substituted before the shell parses the line, and it is unquoted. Fix: use the runner env var instead, written as `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. Line numbers are approximate.

Locations:

- `action.yml:400`
- `action.yml:413`
- `action.yml:527`
- `action.yml:540`
- `action.yml:587`
- `action.yml:609`
- `action.yml:635`
- `action.yml:667`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, eight composite steps had `bash ${{ github.action_path }}/action/scripts/<x>.sh` in their run: line. These are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Each now reads `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. All of these steps use shell: bash, so the quoted variable syntax is correct. ACTION_JQ_DIR still uses github.action_path, but only inside env: blocks, which is safe. No other files were changed.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

In action.yml, the 'Emit inline annotations' and 'Job summary' steps each had a 'run:' line that was over-indented and had the next step's '- name:' joined onto it. Both caused 'mapping values are not allowed' errors. I put each 'run:' back at the step's own indentation and moved 'Job summary' and 'Post review comments' onto their own lines. The script commands are unchanged.


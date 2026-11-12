<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.41.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.41.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), expression placed directly in a run: block. Eight composite steps in action.yml put the GitHub expression ${{ github.action_path }} straight into the shell command, for example `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The affected steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. The runner substitutes the value into the script text before the shell parses it. Fix: use the runner-provided env var instead, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`
- `action.yml:430`
- `action.yml:546`
- `action.yml:559`
- `action.yml:606`
- `action.yml:628`
- `action.yml:654`
- `action.yml:687`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, eight run: lines used `bash ${{ github.action_path }}/action/scripts/<script>.sh`. Each now reads `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash. Two env: entries still use ${{ github.action_path }} for ACTION_JQ_DIR. I left them alone because the value goes into an environment variable and is never parsed as shell code.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is interpolated directly into run commands. 8 steps in action.yml do this: `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The scripts are install.sh (Install fallow), broker-token.sh (Fallow branded token), analyze.sh (Run analysis), check-code-scanning.sh (Check Code Scanning availability), comment.sh (Post PR comment), annotate.sh (Emit inline annotations), summary.sh (Job summary) and review.sh (Post review comments). Use the quoted env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:415`
- `action.yml:428`
- `action.yml:541`
- `action.yml:554`
- `action.yml:601`
- `action.yml:623`
- `action.yml:649`
- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<script>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 bash steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). The github.action_path expressions in env: (ACTION_JQ_DIR) are already in env: blocks, so they were left as they are.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<script>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in four steps: Install fallow, Fallow branded token, Check Code Scanning availability and Post PR comment. This matches the form the other steps already used (analyze.sh, annotate.sh). All of these steps run under shell: bash, so the quoted environment variable works as-is. The ACTION_JQ_DIR env: entries that use github.action_path were left alone, because an expression in env: is the safe pattern. The action was not run after the change; the edit is a direct swap and I only re-read the first changed line to confirm it.


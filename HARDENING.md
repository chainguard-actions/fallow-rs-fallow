<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), an expression placed directly in a run: block: every script-invoking step in this composite action puts `${{ github.action_path }}` straight into the run: string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The same pattern appears in the steps that run install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. The fix is to use the quoted env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:638`
- `action.yml:671`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in 8 steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them are bash steps. I left the ACTION_JQ_DIR values that use github.action_path in env: unchanged, because env: values are not interpolated into the script.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Fixed the broken YAML on the Run analysis step: 'run:run: bash "...analyze.sh"  - name: Check Code Scanning availability' had merged two lines into one. It is now a proper run: line followed by the next step. Replaced the inline ${{ github.action_path }} in the run: lines for broker-token.sh, annotate.sh and review.sh with "$GITHUB_ACTION_PATH/action/scripts/<script>.sh". All are bash steps. env: entries such as ACTION_JQ_DIR, which hold the github.action_path expression, were left alone because they are not shell-interpolated.


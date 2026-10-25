<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly in the `run:` shell command in 8 composite steps. The 8 steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Example offending line: `run: bash ${{ github.action_path }}/action/scripts/install.sh` (the same pattern is used for broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh). Fix: use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 composite steps from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`. The scripts are install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. Each step still runs the same script, and the path is now quoted so it can't be split into separate words. Two ACTION_JQ_DIR values in env: blocks still use github.action_path. That is safe because env: values are never parsed by the shell, so I left them unchanged. Nothing was run to test this.


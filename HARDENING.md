<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation, plus an unquoted path. 8 composite steps put the expression ${{ github.action_path }} straight into the run: string, unquoted. The 8 steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Example offending line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The others are the same line with broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. Fix: use the runner env var with quotes instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:412`
- `action.yml:420`
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

In action.yml, replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 named steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All of them use shell: bash. The ACTION_JQ_DIR env entries were left unchanged because values set in env: are not inserted into the shell script.


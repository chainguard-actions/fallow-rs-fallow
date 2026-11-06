<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a), direct expression interpolation: a GitHub Actions expression is placed directly inside a run: shell command in 8 composite steps. The offending line is `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The affected steps are 'Install fallow' (install.sh, byte offset ~29127), 'Fallow branded token' (broker-token.sh, ~29587), 'Run analysis' (analyze.sh, ~35506), 'Check Code Scanning availability' (check-code-scanning.sh, ~35901), 'Post PR comment' (comment.sh, ~37987), 'Emit inline annotations' (annotate.sh, ~39014), 'Job summary' (summary.sh, ~40712) and 'Post review comments' (review.sh, ~42273). Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. ACTION_JQ_DIR env values that use github.action_path remain in env: blocks, which is the safe form.


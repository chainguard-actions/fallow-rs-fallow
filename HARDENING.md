<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 run: steps in action.yml interpolate ${{ github.action_path }} directly inside the shell command string. Per the check rules, ANY ${{ ... }} expression in a run: block is a script-injection finding, including github.* contexts, because the value flows through YAML template substitution before the shell sees it. The affected lines are: 'run: bash ${{ github.action_path }}/action/scripts/install.sh', 'run: bash ${{ github.action_path }}/action/scripts/broker-token.sh', 'run: bash ${{ github.action_path }}/action/scripts/analyze.sh', 'run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh', 'run: bash ${{ github.action_path }}/action/scripts/comment.sh', 'run: bash ${{ github.action_path }}/action/scripts/annotate.sh', 'run: bash ${{ github.action_path }}/action/scripts/summary.sh', and 'run: bash ${{ github.action_path }}/action/scripts/review.sh'. The safe pattern is to reference the action path via the $GITHUB_ACTION_PATH environment variable instead.

Locations:

- `action.yml:453`
- `action.yml:461`
- `action.yml:479`
- `action.yml:485`
- `action.yml:537`
- `action.yml:556`
- `action.yml:572`
- `action.yml:608`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml by replacing `bash ${{ github.action_path }}/action/scripts/SCRIPT.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/SCRIPT.sh"` in the run: steps for: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. The 2 remaining `${{ github.action_path }}` references are in env: blocks (ACTION_JQ_DIR) and are not script-injection findings.


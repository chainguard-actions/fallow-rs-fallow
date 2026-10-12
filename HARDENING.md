<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): The expression `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in 8 composite action steps. Per the script-injection check, ANY `${{ ... }}` expression in a `run:` block is a finding, including `github.*` context values. The safe pattern is to reference the equivalent environment variable `$GITHUB_ACTION_PATH` instead of the expression form. Offending lines: `run: bash ${{ github.action_path }}/action/scripts/install.sh`, `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`, `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`, `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`, `run: bash ${{ github.action_path }}/action/scripts/comment.sh`, `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`, `run: bash ${{ github.action_path }}/action/scripts/summary.sh`, and `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:287`
- `action.yml:295`
- `action.yml:330`
- `action.yml:395`
- `action.yml:430`
- `action.yml:460`
- `action.yml:490`
- `action.yml:520`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced all 8 occurrences of `run: bash ${{ github.action_path }}/action/scripts/*.sh` with `run: bash $GITHUB_ACTION_PATH/action/scripts/*.sh` in action.yml. The `$GITHUB_ACTION_PATH` environment variable is the safe equivalent already set by the GitHub Actions runner, eliminating the need to interpolate the `${{ github.action_path }}` expression directly into shell command strings. The `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` entries in env: blocks were not modified as they are not script injection issues.


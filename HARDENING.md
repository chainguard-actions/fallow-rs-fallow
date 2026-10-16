<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in 8 composite action steps. Per the check rules, ANY `${{ ... }}` expression directly inside a `run:` block is a script-injection finding, including GitHub-controlled contexts like `github.action_path`, because the YAML template substitution occurs before the shell processes the command. The safe fix is to replace `${{ github.action_path }}` with the `$GITHUB_ACTION_PATH` environment variable, which is already set by the runner without going through YAML interpolation. Affected lines: `run: bash ${{ github.action_path }}/action/scripts/install.sh`, `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`, `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`, `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`, `run: bash ${{ github.action_path }}/action/scripts/comment.sh`, `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`, `run: bash ${{ github.action_path }}/action/scripts/summary.sh`, `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:365`
- `action.yml:374`
- `action.yml:430`
- `action.yml:449`
- `action.yml:476`
- `action.yml:490`
- `action.yml:510`
- `action.yml:530`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced all 8 occurrences of `${{ github.action_path }}` in `run:` shell command strings with `$GITHUB_ACTION_PATH` (the runner-provided environment variable). The affected scripts were: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. Two remaining occurrences of `github.action_path` in `env:` blocks (setting ACTION_JQ_DIR) were left unchanged as they are not script-injection findings.


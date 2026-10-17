<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string. Per the check rules, ANY `${{ ... }}` expression — including `github.*` contexts — interpolated directly in a `run:` block is a script-injection finding, because the value flows through YAML template substitution before the shell ever sees it. All eight steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The safe alternative is to reference the path via the `$GITHUB_ACTION_PATH` environment variable (already available in composite action steps), which avoids inline expression interpolation entirely.

Locations:

- `action.yml:428`
- `action.yml:436`
- `action.yml:456`
- `action.yml:510`
- `action.yml:519`
- `action.yml:548`
- `action.yml:572`
- `action.yml:601`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in hardened/action/action.yml. Each `run:` step that directly interpolated `${{ github.action_path }}` inside the shell command string (e.g., `bash ${{ github.action_path }}/action/scripts/install.sh`) was replaced with the equivalent using the pre-set `$GITHUB_ACTION_PATH` environment variable (e.g., `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`). The affected scripts were: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. The `ACTION_JQ_DIR` env var entries that reference `${{ github.action_path }}` were left unchanged as they are in the `env:` block (not in `run:` shell strings) and are not script-injection findings.


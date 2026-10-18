<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.1** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` blocks in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Per the check, ANY `${{ ... }}` expression — including `github.*` contexts — interpolated directly in a `run:` block is a script-injection finding, because the value flows through YAML template substitution before the shell sees it. The safe pattern is to use the `$GITHUB_ACTION_PATH` environment variable instead, which is already available in composite action steps.

Locations:

- `action.yml:383`
- `action.yml:392`
- `action.yml:452`
- `action.yml:460`
- `action.yml:510`
- `action.yml:527`
- `action.yml:549`
- `action.yml:575`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml by replacing `${{ github.action_path }}` in run: blocks with `$GITHUB_ACTION_PATH`. The affected steps were: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, and Post review comments. The 2 remaining occurrences of `github.action_path` are in env: blocks (ACTION_JQ_DIR), which is the safe pattern and not a finding.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in hardened/action/action/scripts/analyze.sh. The FALLOW_RENDER_PATH_PREFIX variable (derived from user-controlled INPUT_ARGS via EXTRA_ARGS) was written directly to $GITHUB_ENV without sanitization. Added a sanitization step: `SAFE_FALLOW_RENDER_PATH_PREFIX=$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')` before the printf to $GITHUB_ENV, and replaced the unsanitized variable reference with the sanitized one. This strips carriage returns (\r) and newlines (\n) that could corrupt the GITHUB_ENV file format.

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

Fixed two github-env-injection findings:

1. action/scripts/analyze.sh: Added sanitization before writing FALLOW_DIFF_FILE to $GITHUB_ENV. The user-controlled value (from diff-file input) is now sanitized with `_safe_diff_file=$(printf '%s' "$FALLOW_DIFF_FILE" | tr -d '\n\r')` before the write. Also sanitized the auto-generated _DIFF_PATH write for defense-in-depth.

2. action/scripts/broker-token.sh: Added sanitization before writing the broker-returned token to $GITHUB_OUTPUT. The external HTTP response value is now sanitized with `_safe_token=$(printf '%s' "$token" | tr -d '\n\r')` before the write.


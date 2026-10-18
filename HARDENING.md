<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Any `${{ ... }}` expression inside a `run:` block is a script-injection risk regardless of the context — the value flows through YAML template substitution before the shell sees it. The safe pattern is to expose `github.action_path` via an `env:` variable and reference it as `$ENV_VAR` in the script.

Locations:

- `action.yml:370`
- `action.yml:380`
- `action.yml:450`
- `action.yml:460`
- `action.yml:490`
- `action.yml:510`
- `action.yml:540`
- `action.yml:570`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the user-controlled value `FALLOW_DIFF_FILE` (sourced from `inputs.diff-file` via the step's `env:` block) is written to `$GITHUB_ENV` without the required sanitization pipeline (`printf '%s' "$VAR" | tr -d '\n\r'`). The line `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"` allows a value containing newlines to inject arbitrary environment variables. The `contains_ascii_control` validation check rejects values with control characters but does not constitute the required sanitization step. Additionally, `FALLOW_RENDER_PATH_PREFIX` (extracted from user-controlled `inputs.args` via `read -ra EXTRA_ARGS <<< "$INPUT_ARGS"`) is also written to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`.

Locations:

- `action/scripts/analyze.sh:640`
- `action/scripts/analyze.sh:720`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by moving github.action_path out of run: blocks into env: blocks as ACTION_PATH, then referencing $ACTION_PATH in the shell commands. Fixed 2 github-env-injection instances in action/scripts/analyze.sh: (1) FALLOW_DIFF_FILE (from inputs.diff-file) sanitized with tr -d '\n\r' before writing to GITHUB_ENV; (2) FALLOW_RENDER_PATH_PREFIX (from inputs.args) sanitized with tr -d '\n\r' before writing to GITHUB_ENV. Both sanitizations use the two-step capture pattern to preserve correct exit-status behavior under errexit.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` into the shell command string before the shell processes it. Per the check rules, ANY `${{ ... }}` expression inside a `run:` block is a script-injection finding regardless of which context it reads from. The pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` appears in every composite step. The fix is to move `github.action_path` into an `env:` variable (e.g. `ACTION_PATH: ${{ github.action_path }}`) and reference it as `"$ACTION_PATH"` in the `run:` block.

Locations:

- `action.yml:338`
- `action.yml:346`
- `action.yml:430`
- `action.yml:436`
- `action.yml:470`
- `action.yml:490`
- `action.yml:515`
- `action.yml:540`

### github-env-injection (severity: high)

Two writes of untrusted-input values to special GitHub environment files in action/scripts/analyze.sh lack the required `printf '%s' ... | tr -d '\n\r'` sanitization step:

1. `printf '%s\n' "changed_since=${INPUT_CHANGED_SINCE:-}" >> "$GITHUB_OUTPUT"` — `INPUT_CHANGED_SINCE` derives from `inputs.changed-since` (workflow-controlled). The script validates for ASCII control characters and rejects them, but does not apply the required `tr -d '\n\r'` sanitization pipeline before the write.

2. `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"` — `FALLOW_DIFF_FILE` derives from `inputs.diff-file` (workflow-controlled). Similarly validated but not sanitized with `tr -d '\n\r'` before the write.

Routing through validation-and-exit is not equivalent to the required sanitization step; the check rule requires `printf '%s' "$VAR" | tr -d '\n\r'` applied immediately before every write.

Locations:

- `action/scripts/analyze.sh:600`
- `action/scripts/analyze.sh:640`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by adding ACTION_PATH env var to each affected step and replacing 'bash ${{ github.action_path }}/...' with 'bash "$ACTION_PATH"/...'. Fixed 2 github-env-injection instances in action/scripts/analyze.sh by sanitizing INPUT_CHANGED_SINCE (before writing to $GITHUB_OUTPUT) and FALLOW_DIFF_FILE (before writing to $GITHUB_ENV) using 'printf "%s" "$VAR" | tr -d "\n\r"' into intermediate variables before the write.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in action/scripts/analyze.sh. The variables FALLOW_RENDER_PATH_PREFIX (derived from user-controlled INPUT_ARGS via EXTRA_ARGS) and ANALYSIS_ARGS_JSON were written directly to $GITHUB_ENV without newline sanitization. Added sanitization using `printf '%s' ... | tr -d '\n\r'` to create safe intermediate variables (_safe_prefix and _safe_args_json) before writing to $GITHUB_ENV. FALLOW_RENDER_PATH_PREFIX_SET is always 0 or 1 (set by the script's own logic) so it was left as-is.


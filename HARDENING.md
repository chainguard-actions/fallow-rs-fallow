<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Multiple run: blocks in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string. Per the check rules, any ${{ ... }} expression appearing directly inside a run: block is a script-injection finding, regardless of which context it reads from. All eight composite-action steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`.

Locations:

- `action.yml:281`
- `action.yml:290`
- `action.yml:337`
- `action.yml:344`
- `action.yml:380`
- `action.yml:393`
- `action.yml:415`
- `action.yml:435`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, two unsanitized user-controlled values are written to GitHub special environment files without the required `printf '%s' ... | tr -d '\n\r'` sanitization pipeline: (1) `printf '%s\n' "changed_since=${INPUT_CHANGED_SINCE:-}" >> "$GITHUB_OUTPUT"` — INPUT_CHANGED_SINCE comes from inputs.changed-since (user-controlled); (2) `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"` — FALLOW_DIFF_FILE comes from inputs.diff-file (user-controlled). The validate_action_scalars function checks for ASCII control characters but does not apply the required sanitization before writing to $GITHUB_OUTPUT/$GITHUB_ENV.

Locations:

- `action/scripts/analyze.sh:757`
- `action/scripts/analyze.sh:803`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed all 8 script-injection occurrences in action.yml by replacing `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` (using the built-in GITHUB_ACTION_PATH env var). Fixed 2 github-env-injection issues in action/scripts/analyze.sh: (1) sanitized INPUT_CHANGED_SINCE with `tr -d '\n\r'` before writing to $GITHUB_OUTPUT; (2) sanitized FALLOW_DIFF_FILE with `tr -d '\n\r'` before writing to $GITHUB_ENV. Two remaining `${{ github.action_path }}` references in action.yml are in env: blocks (ACTION_JQ_DIR), which is the correct safe pattern and not a finding.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in action/scripts/analyze.sh at the FALLOW_RENDER_PATH_PREFIX write to $GITHUB_ENV. Added `_safe_render_path_prefix=$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')` before the printf block, and replaced `${FALLOW_RENDER_PATH_PREFIX}` with `${_safe_render_path_prefix}` in the write. This follows the same sanitization pattern already used for FALLOW_DIFF_FILE elsewhere in the same file.


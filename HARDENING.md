<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Per the check rules, ANY `${{ ... }}` expression interpolated directly in a `run:` shell command is a script-injection finding, including `github.*` contexts. The safe alternative is to use the `$GITHUB_ACTION_PATH` environment variable instead.

Locations:

- `action.yml:400`
- `action.yml:408`
- `action.yml:416`
- `action.yml:460`
- `action.yml:470`
- `action.yml:490`
- `action.yml:510`
- `action.yml:560`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, `FALLOW_RENDER_PATH_PREFIX` (derived from user-controlled `inputs.args` via `INPUT_ARGS`) is written to `$GITHUB_ENV` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). The value is extracted from the user-supplied `--report-path-prefix` or `--annotations-path-prefix` argument and written directly: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`. No control-character validation is applied to `INPUT_ARGS` before this write. Additionally, `FALLOW_DIFF_FILE` (from `inputs.diff-file`) is written to `$GITHUB_ENV` without the required sanitization pipeline (only validated for control chars via `contains_ascii_control`, not sanitized with `tr -d '\n\r'`).

Locations:

- `action/scripts/analyze.sh:1050`
- `action/scripts/analyze.sh:930`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed all 8 script-injection occurrences in action.yml by replacing `${{ github.action_path }}` in run: shell command strings with `$GITHUB_ACTION_PATH` (the safe environment variable). Two remaining `${{ github.action_path }}` references in env: blocks (ACTION_JQ_DIR) are safe and were left unchanged. Fixed 3 github-env-injection issues in action/scripts/analyze.sh: (1) FALLOW_DIFF_FILE user-supplied path write sanitized with tr -d '\n\r', (2) FALLOW_DIFF_FILE auto-generated path write sanitized with tr -d '\n\r', (3) FALLOW_RENDER_PATH_PREFIX (from user-controlled inputs.args) sanitized with tr -d '\n\r' before writing to $GITHUB_ENV.


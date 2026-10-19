<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 3 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). While `github.action_path` is GitHub-controlled and not directly attacker-supplied, the check rules require that NO `${{ ... }}` expression appear anywhere inside a `run:` shell command string. Each of these steps should instead use the `$GITHUB_ACTION_PATH` environment variable (already available in composite action steps) or set `ACTION_PATH: ${{ github.action_path }}` in an `env:` block and reference `$ACTION_PATH` in the script.

Locations:

- `action.yml:540`
- `action.yml:545`
- `action.yml:660`
- `action.yml:668`
- `action.yml:712`
- `action.yml:733`
- `action.yml:769`
- `action.yml:800`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the user-controlled value `FALLOW_DIFF_FILE` (sourced from `inputs.diff-file`) is written to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. An attacker can supply a newline in `inputs.diff-file` to inject arbitrary environment variables into subsequent steps. The fix is to sanitize before writing: `safe=$(printf '%s' "$FALLOW_DIFF_FILE" | tr -d '\n\r'); printf 'FALLOW_DIFF_FILE=%s\n' "$safe" >> "$GITHUB_ENV"`.

Locations:

- `action/scripts/analyze.sh:585`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the user-controlled value `FALLOW_RENDER_PATH_PREFIX` (sourced from `inputs.args` via `--report-path-prefix` or `--annotations-path-prefix` flags) is written to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`. An attacker can embed a newline in the `args` input to inject arbitrary environment variables into subsequent steps. The fix is to sanitize: `safe=$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r'); printf 'FALLOW_RENDER_PATH_PREFIX=%s\n' "$safe" >> "$GITHUB_ENV"`.

Locations:

- `action/scripts/analyze.sh:660`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection occurrences in action.yml by replacing `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` (using the automatically-available $GITHUB_ACTION_PATH env var). Fixed 2 github-env-injection issues in action/scripts/analyze.sh: (1) sanitized FALLOW_DIFF_FILE before writing to $GITHUB_ENV using `tr -d '\n\r'`; (2) sanitized FALLOW_RENDER_PATH_PREFIX before writing to $GITHUB_ENV using `tr -d '\n\r'`. The two remaining `github.action_path` references in action.yml are in `env:` blocks (ACTION_JQ_DIR), which is the correct pattern and not a finding.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in 8 composite-action steps. Any `${{ ... }}` expression in a `run:` block flows through YAML template substitution before the shell sees it, making it a script-injection risk. All eight steps follow the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead (e.g., `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`).

Locations:

- `action.yml:360`
- `action.yml:368`
- `action.yml:430`
- `action.yml:437`
- `action.yml:470`
- `action.yml:490`
- `action.yml:510`
- `action.yml:530`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable `FALLOW_RENDER_PATH_PREFIX` is derived from `INPUT_ARGS` (which maps to the `inputs.args` action input — an untrusted, caller-controlled value). It is written to `$GITHUB_ENV` via `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"` without the required `printf '%s' ... | tr -d '\n\r'` sanitization. Unlike `INPUT_CHANGED_SINCE`, `FALLOW_DIFF_FILE`, and `INPUT_BASELINE` (which are validated for ASCII control characters by `validate_action_scalars`), `INPUT_ARGS` receives no such validation, so a newline embedded in the `args` input could inject arbitrary environment variables into subsequent steps.

Locations:

- `action/scripts/analyze.sh:725`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection issues in action.yml by replacing `${{ github.action_path }}` in `run:` blocks with `$GITHUB_ACTION_PATH` (the safe environment variable equivalent). Fixed 1 github-env-injection issue in action/scripts/analyze.sh by sanitizing `FALLOW_RENDER_PATH_PREFIX` (derived from untrusted `INPUT_ARGS`) with `tr -d '\n\r'` before writing it to `$GITHUB_ENV`.


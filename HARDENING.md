<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` (a `github.*` context expression) inside the shell command string. Per the check rules, ANY `${{ ... }}` expression interpolated directly in a `run:` block is a script-injection finding, regardless of which context it reads from. The pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` appears in the Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, and Post review comments steps.

Locations:

- `action.yml:556`
- `action.yml:564`
- `action.yml:626`
- `action.yml:641`
- `action.yml:672`
- `action.yml:690`
- `action.yml:714`
- `action.yml:745`

### github-env-injection (severity: high)

Multiple writes to $GITHUB_ENV in action/scripts/analyze.sh propagate user-controlled input values without the required sanitization (`printf '%s' ... | tr -d '\n\r'`). (1) `FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}` — FALLOW_DIFF_FILE is set from `inputs.diff-file` (user-controlled) and written directly to $GITHUB_ENV. (2) `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` — derived from `inputs.args` (user-controlled extra CLI arguments) and written to $GITHUB_ENV. (3) `FALLOW_ANALYSIS_ARGS_JSON=${ANALYSIS_ARGS_JSON}` — also derived from `inputs.args` and written to $GITHUB_ENV. (4) File paths such as FALLOW_RESULTS_FILE, FALLOW_SCOPED_RESULTS_FILE, FALLOW_ARTIFACTS_DIR, etc. are derived from `INPUT_ARTIFACTS_DIR` (from `inputs.artifacts-dir`, user-controlled) and written to $GITHUB_ENV. An attacker who controls these inputs can inject newlines to define arbitrary environment variables for subsequent steps.

Locations:

- `action/scripts/analyze.sh:390`
- `action/scripts/analyze.sh:541`
- `action/scripts/analyze.sh:598`
- `action/scripts/analyze.sh:601`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection issues in action.yml by moving `github.action_path` from inline `${{ }}` expressions in `run:` blocks into `ACTION_PATH` env vars, then referencing `"$ACTION_PATH/action/scripts/...sh"` in the run commands. Fixed 4 github-env-injection issues in action/scripts/analyze.sh by sanitizing user-controlled values (FALLOW_DIFF_FILE from inputs.diff-file, FALLOW_RENDER_PATH_PREFIX and FALLOW_ANALYSIS_ARGS_JSON from inputs.args, and file paths derived from INPUT_ARTIFACTS_DIR) with `printf '%s' "$VAR" | tr -d '\n\r'` before writing them to $GITHUB_ENV.


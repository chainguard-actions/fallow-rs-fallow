<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): The expression `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in all 8 composite-action steps. Even though `github.action_path` is GitHub-controlled, it flows through YAML template substitution before the shell sees it, making it a script-injection risk per the check rules. All steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The safe fix is to set `ACTION_PATH: ${{ github.action_path }}` in the step's `env:` block and reference `$ACTION_PATH` in the `run:` script instead.

Locations:

- `action.yml:370`
- `action.yml:381`
- `action.yml:430`
- `action.yml:490`
- `action.yml:520`
- `action.yml:545`
- `action.yml:575`
- `action.yml:600`

### github-env-injection (severity: high)

In `action/scripts/analyze.sh`, the variable `FALLOW_RENDER_PATH_PREFIX` is derived from user-controlled `inputs.args` (via `INPUT_ARGS`) and written directly to `$GITHUB_ENV` without the required `printf '%s' "$VAR" | tr -d '\n\r'` sanitization. The `validate_action_scalars` function does not validate `INPUT_ARGS` for control characters. An attacker who controls `inputs.args` can supply a value like `--report-path-prefix $'\nMALICIOUS_VAR=injected'` to inject arbitrary environment variables into subsequent steps. The write is: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`.

Locations:

- `action/scripts/analyze.sh:540`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by moving `${{ github.action_path }}` out of `run:` shell strings into `ACTION_PATH: ${{ github.action_path }}` in each step's `env:` block, then referencing `"$ACTION_PATH"` in the run commands. Fixed github-env-injection in action/scripts/analyze.sh by sanitizing `FALLOW_RENDER_PATH_PREFIX` with `printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r'` before writing it to `$GITHUB_ENV`.


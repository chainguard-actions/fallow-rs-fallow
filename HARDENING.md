<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in 8 composite action steps. Per the check rules, ANY `${{ ... }}` expression directly inside a `run:` block is a script-injection finding, including `github.*` contexts. All 8 steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The offending lines are the `run:` lines in: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Emit inline annotations, Job summary, Post review comments, and the check-code-scanning step.

Locations:

- `action.yml:560`
- `action.yml:569`
- `action.yml:609`
- `action.yml:666`
- `action.yml:700`
- `action.yml:718`
- `action.yml:748`
- `action.yml:779`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable `FALLOW_RENDER_PATH_PREFIX` — derived from `inputs.args` (a user-controlled composite action input) via `EXTRA_ARGS` — is written to `$GITHUB_ENV` with `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"` without the required sanitization step (`printf '%s' "$VAR" | tr -d '\n\r'`). An attacker-controlled value in `inputs.args` containing a newline could inject arbitrary environment variables into subsequent steps.

Locations:

- `action/scripts/analyze.sh:724`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection findings in action.yml by moving `${{ github.action_path }}` out of `run:` blocks into `env:` blocks as `ACTION_PATH: ${{ github.action_path }}` and referencing it as `"$ACTION_PATH/action/scripts/<script>.sh"` in the run commands. Fixed 1 github-env-injection finding in action/scripts/analyze.sh by sanitizing `FALLOW_RENDER_PATH_PREFIX` with `safe_prefix=$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')` before writing it to `$GITHUB_ENV`.


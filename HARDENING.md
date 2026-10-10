<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in action.yml. Although `github.action_path` is GitHub-controlled, the check requires that NO `${{ ... }}` expression appear anywhere inside a `run:` block. All eight run: steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`.

Locations:

- `action.yml:370`
- `action.yml:379`
- `action.yml:420`
- `action.yml:440`
- `action.yml:490`
- `action.yml:510`
- `action.yml:530`
- `action.yml:550`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable `FALLOW_RENDER_PATH_PREFIX` is derived from `inputs.args` (a user-controlled input, mapped via `INPUT_ARGS`) and written to `$GITHUB_ENV` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). The write is: `printf '%s\n' ... "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" ... >> "$GITHUB_ENV"`. An attacker who controls `inputs.args` can pass `--report-path-prefix $'\nFOO=bar'` to inject arbitrary key=value pairs into $GITHUB_ENV, potentially overriding environment variables used by subsequent steps.

Locations:

- `action/scripts/analyze.sh:535`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed script-injection in action.yml: moved `${{ github.action_path }}` out of all 8 `run:` blocks into `env:` blocks as `ACTION_PATH: ${{ github.action_path }}`, then referenced it as `"$ACTION_PATH/action/scripts/<script>.sh"` in each `run:` line. Fixed github-env-injection in action/scripts/analyze.sh: added `_safe_prefix=$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')` before the `printf` that writes to `$GITHUB_ENV`, and used `_safe_prefix` instead of the raw variable to prevent newline injection from user-controlled `INPUT_ARGS`.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings in action.yml. Every composite action step that invokes a script uses the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. Any `${{ ... }}` expression directly in a `run:` block is a script-injection finding regardless of which context it reads from, because the value is substituted by the YAML template engine before the shell ever sees it. An attacker who can influence `github.action_path` (e.g., via a malicious action ref) could inject arbitrary shell commands. The fix is to set `ACTION_PATH: ${{ github.action_path }}` in the step's `env:` block and reference `$ACTION_PATH` in the `run:` script instead.

Locations:

- `action.yml:481`
- `action.yml:489`
- `action.yml:530`
- `action.yml:548`
- `action.yml:566`
- `action.yml:585`
- `action.yml:601`
- `action.yml:621`

### github-env-injection (severity: high)

Two unsanitized writes of user-controlled values to `$GITHUB_ENV` in `action/scripts/analyze.sh`:

(1) `FALLOW_DIFF_FILE` is set from `inputs.diff-file` (a caller-supplied action input, mapped via the step's `env:` block as `FALLOW_DIFF_FILE: ${{ inputs.diff-file }}`). The script then writes it directly to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. A value containing a newline (e.g., `myfile.diff\nSECRET=injected`) would inject an arbitrary environment variable into subsequent steps.

(2) `FALLOW_RENDER_PATH_PREFIX` is extracted from `INPUT_ARGS` (the caller-supplied `inputs.args` input) and written to `$GITHUB_ENV` without sanitization: `printf '%s\n' ... "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" ... >> "$GITHUB_ENV"`. The same newline-injection attack applies.

The fix is to apply `printf '%s' "$VAR" | tr -d '\n\r'` before each write.

Locations:

- `action/scripts/analyze.sh:632`
- `action/scripts/analyze.sh:720`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by adding ACTION_PATH: ${{ github.action_path }} to each step's env: block and replacing 'run: bash ${{ github.action_path }}/action/scripts/X.sh' with 'run: bash "$ACTION_PATH/action/scripts/X.sh"'. Fixed 2 github-env-injection instances in action/scripts/analyze.sh by sanitizing FALLOW_DIFF_FILE and FALLOW_RENDER_PATH_PREFIX with 'printf '%s' "$VAR" | tr -d '\n\r'' before writing to $GITHUB_ENV.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Multiple `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (sub-rule a). Although `github.action_path` is GitHub-controlled, any `${{ ... }}` expression interpolated directly into a `run:` script is a script-injection finding per the check definition. The affected steps are: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, and Post review comments. Each uses the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The fix is to move `github.action_path` into an `env:` variable (e.g. `ACTION_PATH: ${{ github.action_path }}`) and reference it as `"$ACTION_PATH"` in the `run:` block.

Locations:

- `action.yml:424`
- `action.yml:431`
- `action.yml:490`
- `action.yml:499`
- `action.yml:520`
- `action.yml:535`
- `action.yml:555`
- `action.yml:575`

### github-env-injection (severity: high)

Three unsanitized writes of user-controlled values to GitHub special environment files in action/scripts/analyze.sh:

(1) `changed_since` (derived from `inputs.changed-since` via `INPUT_CHANGED_SINCE`) is written to `$GITHUB_OUTPUT` with `printf '%s\n' "changed_since=${INPUT_CHANGED_SINCE:-}" >> "$GITHUB_OUTPUT"`. Only an ASCII-control-character check is performed before the write; the required sanitization pipeline `printf '%s' "$VAR" | tr -d '\n\r'` is not applied.

(2) `FALLOW_DIFF_FILE` (derived from `inputs.diff-file` via the step env block) is written to `$GITHUB_ENV` with `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. Only an ASCII-control-character check is performed; the required sanitization pipeline is not applied.

(3) `FALLOW_RENDER_PATH_PREFIX` (derived from `inputs.args` via `INPUT_ARGS`/`EXTRA_ARGS`) is written to `$GITHUB_ENV` with `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`. No validation or sanitization of `INPUT_ARGS` for control characters is performed before this write.

Locations:

- `action/scripts/analyze.sh:700`
- `action/scripts/analyze.sh:730`
- `action/scripts/analyze.sh:810`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by moving `github.action_path` from `run:` strings into `env:` blocks as `ACTION_PATH: ${{ github.action_path }}` and referencing it as `"$ACTION_PATH"` in the shell command. Fixed 3 github-env-injection instances in action/scripts/analyze.sh by sanitizing user-controlled values with `printf '%s' "$VAR" | tr -d '\n\r'` before writing to GITHUB_OUTPUT/GITHUB_ENV: (1) `changed_since` from `INPUT_CHANGED_SINCE`, (2) `FALLOW_DIFF_FILE` from user-supplied diff-file input, and (3) `FALLOW_RENDER_PATH_PREFIX` from `INPUT_ARGS`.


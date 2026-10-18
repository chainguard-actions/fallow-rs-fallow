<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` blocks in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Any `${{ ... }}` expression directly in a `run:` block is a script-injection risk regardless of which context it reads from. The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead, which is already available in composite action steps.

Locations:

- `action.yml:340`
- `action.yml:349`
- `action.yml:374`
- `action.yml:416`
- `action.yml:437`
- `action.yml:462`
- `action.yml:479`
- `action.yml:499`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, three unsanitized writes of user-controlled values occur to GitHub special environment files:

1. `inputs.changed-since` (via `$INPUT_CHANGED_SINCE`) is written directly to `$GITHUB_OUTPUT` without sanitization: `printf '%s\n' "changed_since=${INPUT_CHANGED_SINCE:-}" >> "$GITHUB_OUTPUT"`. A newline in the value could inject arbitrary output variables.

2. `inputs.diff-file` (via `$FALLOW_DIFF_FILE`) is written directly to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. A newline in the value could inject arbitrary environment variables.

3. `inputs.args` (parsed into `$FALLOW_RENDER_PATH_PREFIX`) is written directly to `$GITHUB_ENV` without sanitization: `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` written via printf to `$GITHUB_ENV`. A newline in the value could inject arbitrary environment variables.

The required fix is to apply `printf '%s' "$VAR" | tr -d '\n\r'` before each write.

Locations:

- `action/scripts/analyze.sh:701`
- `action/scripts/analyze.sh:740`
- `action/scripts/analyze.sh:830`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection occurrences in action.yml by replacing `${{ github.action_path }}` in all `run:` lines with `$GITHUB_ACTION_PATH` (the pre-set environment variable). Fixed 3 github-env-injection issues in action/scripts/analyze.sh: (1) sanitized `INPUT_CHANGED_SINCE` before writing to GITHUB_OUTPUT, (2) sanitized `FALLOW_DIFF_FILE` before writing to GITHUB_ENV, (3) sanitized `FALLOW_RENDER_PATH_PREFIX` before writing to GITHUB_ENV. All sanitizations use `printf '%s' "$VAR" | tr -d '\n\r'` with a separate capture variable to avoid masking command failures under errexit.


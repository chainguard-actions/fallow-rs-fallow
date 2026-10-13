<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string. Any `${{ ... }}` expression inside a `run:` block is a script-injection finding regardless of which context it reads from. Affected steps: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments. Example offending line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`

Locations:

- `action.yml:360`
- `action.yml:371`
- `action.yml:415`
- `action.yml:425`
- `action.yml:450`
- `action.yml:465`
- `action.yml:480`
- `action.yml:495`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, two user-controlled values are written to GitHub special environment files without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`): (1) `FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}` is written to `$GITHUB_ENV` — `FALLOW_DIFF_FILE` originates from `inputs.diff-file` (user-controlled). (2) `changed_since=${INPUT_CHANGED_SINCE:-}` is written to `$GITHUB_OUTPUT` — `INPUT_CHANGED_SINCE` originates from `inputs.changed-since` (user-controlled). While both values are validated with `contains_ascii_control` (which exits on control characters), the required sanitization pattern is not applied immediately before the write as mandated by the check.

Locations:

- `action/scripts/analyze.sh:620`
- `action/scripts/analyze.sh:660`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by replacing `${{ github.action_path }}` in run: shell strings with `$GITHUB_ACTION_PATH` (the runner-set env var). Fixed 2 github-env-injection instances in action/scripts/analyze.sh by adding `printf '%s' ... | tr -d '\n\r'` sanitization immediately before writing FALLOW_DIFF_FILE to $GITHUB_ENV and changed_since to $GITHUB_OUTPUT.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in hardened/action/action/scripts/analyze.sh. The FALLOW_RENDER_PATH_PREFIX variable is derived from user-controlled INPUT_ARGS (via --report-path-prefix or --annotations-path-prefix flags) and was written to $GITHUB_ENV without sanitization. Added a sanitization step using `_safe_render_path_prefix="$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')"` before the printf block, and replaced the raw `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` with `FALLOW_RENDER_PATH_PREFIX=${_safe_render_path_prefix}` in the write to $GITHUB_ENV. This prevents newline injection attacks that could inject arbitrary key=value pairs into $GITHUB_ENV.


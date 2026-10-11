<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

All 8 `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` into the shell command string (sub-rule a). Per the check rules, any `${{ ... }}` expression — including `github.*` contexts — directly inside a `run:` shell command string is a script-injection finding. The affected steps are: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, and Post review comments. Example: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:600`
- `action.yml:608`
- `action.yml:660`
- `action.yml:672`
- `action.yml:710`
- `action.yml:730`
- `action.yml:760`
- `action.yml:790`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, three writes to special environment files use untrusted input values without the required `printf '%s' ... | tr -d '\n\r'` sanitization immediately before the write:

1. `printf '%s\n' "changed_since=${INPUT_CHANGED_SINCE:-}" >> "$GITHUB_OUTPUT"` — INPUT_CHANGED_SINCE is sourced from `inputs.changed-since` (an untrusted action input). Although `validate_action_scalars()` rejects values containing ASCII control characters (including \n and \r) via `contains_ascii_control`, this is a validation-and-reject approach rather than the required sanitization pattern.

2. `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"` — FALLOW_DIFF_FILE is sourced from `inputs.diff-file` (an untrusted action input). Same validation applies but not the required sanitization.

3. `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"` — FALLOW_RENDER_PATH_PREFIX is extracted from `inputs.args` (an untrusted action input) and written to GITHUB_ENV without sanitization.

Locations:

- `action/scripts/analyze.sh:580`
- `action/scripts/analyze.sh:605`
- `action/scripts/analyze.sh:660`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by replacing `${{ github.action_path }}` in run: blocks with `$GITHUB_ACTION_PATH` (quoted). Fixed 3 github-env-injection instances in action/scripts/analyze.sh by adding `printf '%s' ... | tr -d '\n\r'` sanitization into intermediate variables before writing INPUT_CHANGED_SINCE to GITHUB_OUTPUT, FALLOW_DIFF_FILE to GITHUB_ENV, and FALLOW_RENDER_PATH_PREFIX to GITHUB_ENV.


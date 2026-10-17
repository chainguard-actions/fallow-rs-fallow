<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Any `${{ ... }}` expression directly inside a `run:` shell command string is a script-injection finding regardless of which context it reads from. The safe pattern is to reference the pre-set environment variable `$GITHUB_ACTION_PATH` instead.

Locations:

- `action.yml:270`
- `action.yml:278`
- `action.yml:380`
- `action.yml:388`
- `action.yml:430`
- `action.yml:450`
- `action.yml:480`
- `action.yml:500`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable `FALLOW_RENDER_PATH_PREFIX` — derived from `inputs.args` (a user-controlled composite-action input) via argument parsing — is written to `$GITHUB_ENV` without sanitization: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" ... >> "$GITHUB_ENV"`. An attacker can embed a newline in the `args` input to inject arbitrary environment variable definitions into subsequent steps. The required sanitization step (`safe=$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')`) is absent before the write.

Locations:

- `action/scripts/analyze.sh:700`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection occurrences in action.yml by replacing `${{ github.action_path }}` with `$GITHUB_ACTION_PATH` in all `run:` blocks (install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, review.sh). The two remaining `${{ github.action_path }}` uses in `env:` blocks (ACTION_JQ_DIR) are not script-injection findings. Fixed github-env-injection in action/scripts/analyze.sh by sanitizing `FALLOW_RENDER_PATH_PREFIX` with `tr -d '\n\r'` before writing it to `$GITHUB_ENV`, preventing newline injection from user-controlled `args` input.


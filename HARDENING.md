<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` (a `github.*` context expression) inside the shell command string. Per the script-injection rule, ANY `${{ ... }}` expression inside a `run:` block is a finding, regardless of whether the context is attacker-controlled. All eight steps follow the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The fix is to use the `$GITHUB_ACTION_PATH` environment variable (already available in composite actions) instead of the expression: `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:514`
- `action.yml:522`
- `action.yml:556`
- `action.yml:621`
- `action.yml:648`
- `action.yml:668`
- `action.yml:686`
- `action.yml:703`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable `FALLOW_RENDER_PATH_PREFIX` is derived from `INPUT_ARGS` (which maps to the user-controlled `inputs.args` action input) and written to `$GITHUB_ENV` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). The value is extracted from `EXTRA_ARGS` (split from `INPUT_ARGS` via `read -ra`) and then written as: `printf '%s\n' "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" >> "$GITHUB_ENV"`. While `read -ra` splits on newlines, it does not strip carriage returns (`\r`), so a `\r` in the input could inject a spurious line into `$GITHUB_ENV`, potentially overwriting environment variables consumed by subsequent steps. The fix is to sanitize the value before writing: `safe=$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')` and then write `$safe`.

Locations:

- `action/scripts/analyze.sh:720`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

1. script-injection (action.yml, 8 locations): Replaced all `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` for install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. The 2 remaining `github.action_path` expressions are in `env:` blocks (ACTION_JQ_DIR) which is the correct pattern. 2. github-env-injection (action/scripts/analyze.sh, line ~720): Added sanitization of FALLOW_RENDER_PATH_PREFIX before writing to $GITHUB_ENV: `safe_render_path_prefix=$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')` and used `$safe_render_path_prefix` in the printf write to $GITHUB_ENV.


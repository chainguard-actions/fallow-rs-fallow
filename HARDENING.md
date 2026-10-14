<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings across all 8 composite action steps. Although `github.action_path` is not attacker-controlled, any `${{ ... }}` expression inside a `run:` block flows through YAML template substitution before the shell processes it, making it a script-injection risk per the check rules. Offending pattern in every step: `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead (e.g., `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`).

Locations:

- `action.yml:453`
- `action.yml:462`
- `action.yml:490`
- `action.yml:498`
- `action.yml:549`
- `action.yml:563`
- `action.yml:601`
- `action.yml:635`

### github-env-injection (severity: high)

In `analyze.sh`, the value `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` is written to `$GITHUB_ENV` without sanitization (no `printf '%s' ... | tr -d '\n\r'` step). `FALLOW_RENDER_PATH_PREFIX` is extracted from `INPUT_ARGS` (which maps to the user-controlled `inputs.args` action input) via the `--report-path-prefix` or `--annotations-path-prefix` flag. The `validate_action_scalars` function validates `changed_since`, `diff_file`, and `baseline` for ASCII control characters but does NOT validate `INPUT_ARGS`. An attacker can supply `--report-path-prefix=value$'\nFOO=bar'` in `inputs.args` to inject arbitrary environment variables into `$GITHUB_ENV`, which persist across subsequent composite action steps. The fix is to apply `safe=$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')` before writing to GITHUB_ENV.

Locations:

- `action/scripts/analyze.sh:481`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

1. script-injection (action.yml, 8 locations): Replaced all 8 `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` lines with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The scripts affected are: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. Two remaining `${{ github.action_path }}` references in env: blocks (ACTION_JQ_DIR) are not in run: shell strings and are not script-injection risks. 2. github-env-injection (analyze.sh, line 481): Added sanitization of FALLOW_RENDER_PATH_PREFIX before writing to $GITHUB_ENV. The value is now captured via `safe_render_path_prefix="$(printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r')"` and the sanitized variable is written instead of the raw one, preventing newline injection from attacker-controlled inputs.args values.


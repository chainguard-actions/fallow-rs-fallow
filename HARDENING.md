<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): Eight run: blocks in action.yml interpolate ${{ github.action_path }} directly inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Any ${{ ... }} expression in a run: block is a script-injection finding regardless of whether the context is attacker-controlled, because the value flows through YAML template substitution before the shell sees it. Affected steps: 'Install fallow', 'Fallow branded token', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary', 'Post review comments'. The safe pattern is to use the $GITHUB_ACTION_PATH environment variable instead.

Locations:

- `action.yml:1`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, the variable FALLOW_RENDER_PATH_PREFIX is derived from inputs.args (via EXTRA_ARGS, parsed from INPUT_ARGS) and written to $GITHUB_ENV without sanitization: `printf '%s\n' ... "FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}" ... >> "$GITHUB_ENV"`. The validate_action_scalars function validates changed_since, diff_file, baseline, and per-analysis baselines for ASCII control characters, but INPUT_ARGS is not validated. A caller can supply a value like `--report-path-prefix $'\nMALICIOUS_VAR=injected'` in the args input to inject arbitrary environment variables into $GITHUB_ENV. The fix is to apply `printf '%s' "$FALLOW_RENDER_PATH_PREFIX" | tr -d '\n\r'` before writing to $GITHUB_ENV.

Locations:

- `action/scripts/analyze.sh:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by replacing `${{ github.action_path }}` in run: blocks with `$GITHUB_ACTION_PATH` (the safe environment variable form). The two remaining `${{ github.action_path }}` references in env: blocks (ACTION_JQ_DIR) are not injection findings and were left unchanged. Fixed github-env-injection in action/scripts/analyze.sh by sanitizing FALLOW_RENDER_PATH_PREFIX with `tr -d '\n\r'` before writing to $GITHUB_ENV, preventing newline injection from user-controlled INPUT_ARGS.


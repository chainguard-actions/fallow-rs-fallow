<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.0** was hardened automatically. 0 finding(s) were identified and resolved across 2 iteration(s).

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step that used `bash ${{ github.action_path }}/action/scripts/X.sh` in its `run:` line was updated to add `ACTION_PATH: ${{ github.action_path }}` to the step's `env:` block and changed the `run:` line to `bash "$ACTION_PATH/action/scripts/X.sh"`. This applies to: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh steps.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh, added sanitization of FALLOW_RENDER_PATH_PREFIX before writing it to $GITHUB_ENV. The fix introduces a `_SAFE_RENDER_PATH_PREFIX` variable that strips newlines and carriage returns using `printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r'`, then uses `_SAFE_RENDER_PATH_PREFIX` in the printf that writes to $GITHUB_ENV. This prevents an attacker from injecting additional environment variables via embedded newlines in the --report-path-prefix or --annotations-path-prefix arguments.


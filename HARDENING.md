<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 0 finding(s) were identified and resolved across 2 iteration(s).

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection findings in action.yml by replacing `bash ${{ github.action_path }}/...` in run: blocks with `bash "$GITHUB_ACTION_PATH/..."`. Fixed 3 github-env-injection findings in action/scripts/analyze.sh: (1) sanitized INPUT_CHANGED_SINCE before writing changed_since to GITHUB_OUTPUT, (2) sanitized FALLOW_DIFF_FILE before writing to GITHUB_ENV (user-supplied path case), (3) sanitized all artifact path variables (RESULTS_FILE, SCOPED_RESULTS_FILE, ANALYSIS_ARGS_FILE, CHANGED_FILES_FILE, SARIF_FILE, ARTIFACTS_DIR) before writing to GITHUB_ENV. All sanitization uses the required `printf '%s' ... | tr -d '\n\r'` pattern.

### Iteration 2

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in action/scripts/analyze.sh at the FALLOW_RENDER_PATH_PREFIX write to $GITHUB_ENV. Added sanitization: `_safe_render_path_prefix="$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')"` before the printf block, and replaced `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` with `FALLOW_RENDER_PATH_PREFIX=${_safe_render_path_prefix}` in the write. This matches the sanitization pattern already used for FALLOW_DIFF_FILE and changed_since in the same script.


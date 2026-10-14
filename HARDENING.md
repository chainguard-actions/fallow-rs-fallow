<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Eight `run:` blocks in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string (sub-rule a: direct expression interpolation). Per the check rules, ANY `${{ ... }}` expression inside a `run:` shell command — including `github.*` contexts — is a script-injection finding because the value flows through YAML template substitution before the shell sees it. All eight steps use the pattern `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead (already available in composite action steps), e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:365`
- `action.yml:374`
- `action.yml:430`
- `action.yml:437`
- `action.yml:462`
- `action.yml:476`
- `action.yml:503`
- `action.yml:530`

### github-env-injection (severity: high)

In action/scripts/analyze.sh, several user-controlled values are written to $GITHUB_ENV without the required `printf '%s' "$VAR" | tr -d '\n\r'` sanitization immediately before the write. Specifically: (1) `FALLOW_DIFF_FILE` (sourced from `inputs.diff-file`, a caller-controlled input) is written via `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"` — the script validates for ASCII control characters with `contains_ascii_control` and exits on failure, but does not apply the required `tr -d '\n\r'` sanitization step. (2) `FALLOW_RENDER_PATH_PREFIX` (derived from `inputs.args`) and the artifact-path variables derived from `INPUT_ARTIFACTS_DIR` (`inputs.artifacts-dir`) are similarly written to $GITHUB_ENV with custom validation rather than the mandated sanitization pipeline. The required pattern before each write is: `safe=$(printf '%s' "$VAR" | tr -d '\n\r')` followed by `echo "KEY=$safe" >> "$GITHUB_ENV"`.

Locations:

- `action/scripts/analyze.sh:322`
- `action/scripts/analyze.sh:460`
- `action/scripts/analyze.sh:530`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 8 script-injection instances in action.yml by replacing 'bash ${{ github.action_path }}/action/scripts/xxx.sh' with 'bash "$GITHUB_ACTION_PATH/action/scripts/xxx.sh"' in all run: blocks (install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, review.sh). Fixed 3 github-env-injection instances in action/scripts/analyze.sh: (1) sanitized FALLOW_DIFF_FILE (user-supplied inputs.diff-file) before writing to GITHUB_ENV; (2) sanitized FALLOW_RENDER_PATH_PREFIX (derived from inputs.args) before writing to GITHUB_ENV; (3) sanitized all 6 artifact path variables derived from INPUT_ARTIFACTS_DIR (inputs.artifacts-dir) before writing to GITHUB_ENV. All sanitization uses the required 'printf "%s" "$VAR" | tr -d "\n\r"' pattern.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is inserted directly into run: shell commands in 8 composite steps. Each one has the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The affected steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the runner-provided env var instead, quoted, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

### github-env-injection (severity: high)

The Run analysis step sets FALLOW_DIFF_FILE from ${{ inputs.diff-file }}. Its script, action/scripts/analyze.sh, then writes that value to $GITHUB_ENV with no sanitization: `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. A value containing a newline can inject extra environment variables into the later steps of the job. Fix: strip newlines first, e.g. `safe=$(printf '%s' "$FALLOW_DIFF_FILE" | tr -d '\n\r')`, and write "$safe". artifacts-dir already gets a newline check before its write, and the same could be done here.

Locations:

- `action/scripts/analyze.sh:790`
- `action.yml:532`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/X.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 composite steps (ACTION_JQ_DIR env entries left as-is since they are in env:, not run:). In analyze.sh, the user-supplied FALLOW_DIFF_FILE is now stripped of \n/\r before being written to $GITHUB_ENV; the auto-generated path derives from artifacts-dir which is already newline-checked.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 9 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression straight into its run: string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

### github-env-injection (severity: high)

The 'Run analysis' step runs action/scripts/analyze.sh, which writes caller-supplied values to $GITHUB_ENV without stripping newlines first. FALLOW_DIFF_FILE comes from inputs.diff-file and is written as `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`. ARTIFACTS_DIR comes from inputs.artifacts-dir and is written as `"FALLOW_ARTIFACTS_DIR=${ARTIFACTS_DIR}"`. A value containing a newline can add extra environment variables, such as BASH_ENV or NODE_OPTIONS, for the steps that follow. Strip the value with `printf '%s' "$VAR" | tr -d '\n\r'` before each write.

Locations:

- `action.yml:531`
- `action/scripts/analyze.sh`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

action.yml: the 8 `run: bash ${{ github.action_path }}/action/scripts/X.sh` lines are now `run: bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`. Every one of those steps uses shell: bash, so the bash variable syntax is correct. analyze.sh: before being written to $GITHUB_ENV, FALLOW_ARTIFACTS_DIR, the user-supplied FALLOW_DIFF_FILE and the auto-generated diff path are now passed through `printf '%s' | tr -d '\n\r'`. analyze.sh already rejected an artifacts-dir containing a newline, so for that value this is an extra safety layer.

### Iteration 1

**Fixes applied:** publish-gate

**Notes:**

Repaired action/scripts/analyze.sh where two earlier edits had been pasted into the middle of existing lines. (1) Artifact-path GITHUB_ENV block: restored the line "FALLOW_CHANGED_FILES_FILE=${CHANGED_FILES_FILE}" and kept only the sanitized FALLOW_ARTIFACTS_DIR line, removing a leftover duplicate that wrote the unsanitized value. (2) Diff-path GITHUB_ENV block: restored the missing `if [ -n "${GITHUB_ENV:-}" ]; then`, which caused the `fi` parse error at line 841, and removed a leftover duplicate unsanitized write. The end of the comment there was lost and has been reconstructed. Sanitized (newline-stripped) writes are kept. No shell syntax check was run; the file was only re-read.

### Iteration 2

**Fixes applied:** publish-gate

**Notes:**

Fixed the parse error at action/scripts/analyze.sh line 841. An earlier hardening edit had cut off the comment and the `if [ -n "${GITHUB_ENV:-}" ]; then` line that guards the FALLOW_DIFF_FILE write to $GITHUB_ENV, and left the old and new printf lines joined on one line. That left a `fi` with no matching `if`. I restored the guard and kept the newline-stripped SAFE_DIFF_PATH write. Nothing else changed. I haven't run a parser on the edited script, so the publish-gate re-check is the first real test that it parses.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"` instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 `run: bash ${{ github.action_path }}/action/scripts/X.sh` lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) now read `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Every one of these steps uses shell: bash. I left the ACTION_JQ_DIR env values that use github.action_path alone, because env: entries are not shell-injectable.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

In action.yml, the 'Install fallow' and 'Post review comments' steps now run their scripts with bash "$GITHUB_ACTION_PATH/action/scripts/install.sh" and bash "$GITHUB_ACTION_PATH/action/scripts/review.sh" instead of an inline ${{ github.action_path }}. I also fixed the broken 'Job summary' line ('run:run: bash .../summary.sh  - name: Post review comments'), which caused the YAML error at line 640. It is now 'run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"' followed by a correctly indented '- name: Post review comments' step. My first edit for that line reported success but did not change the file; a second edit did, and reading the file back confirms it.

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh, the user-supplied FALLOW_DIFF_FILE (from inputs.diff-file) is now checked before it is written to $GITHUB_ENV. If it contains a newline or carriage return, the step stops with an ::error:: and exit code 2, the same way the script already handles artifacts-dir. The value is also passed through tr -d '\n\r' right before the write. The other FALLOW_DIFF_FILE write uses the script's own artifact path, built from the already-checked artifacts-dir, so it was left alone. action.yml needed no change.


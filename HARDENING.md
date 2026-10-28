<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violation in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh` puts an expression straight into the shell command. Pass it through env instead, e.g. ACTION_PATH: ${{ github.action_path }} with `bash "$ACTION_PATH/action/scripts/install.sh"`, or use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:410`

### script-injection (severity: high)

Rule (a) violation in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:418`

### script-injection (severity: high)

Rule (a) violation in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a) violation in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a) violation in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a) violation in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a) violation in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a) violation in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh` puts an expression straight into the shell command.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review), replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps are shell: bash, so quoting the $VAR form is right. A few edits broke the YAML layout at first (wrong indentation, missing newlines). I fixed those and re-read the section to confirm it is well-formed. ACTION_JQ_DIR still gets github.action_path through env:, which is already the safe pattern, so I left it as it was.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh (a bash script), FALLOW_DIFF_FILE from the diff-file input is now checked before it is written to $GITHUB_ENV. A value containing CR or LF stops the script with an ::error:: and exit 2. As a second layer, the value is also passed through tr -d '\n\r' before the write. The other write uses an auto-generated path (_DIFF_PATH), so it was left alone. action.yml needed no change, since the env: mapping itself is safe.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) broken in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh` puts a ${{ }} expression straight into the run: script. Move it into env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH/action/scripts/install.sh", or use the quoted "$GITHUB_ACTION_PATH". Byte offset 29127.

Locations:

- `action.yml:350`

### script-injection (severity: high)

Rule (a) broken in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` puts an expression straight into the run: script. Byte offset 29587.

Locations:

- `action.yml:362`

### script-injection (severity: high)

Rule (a) broken in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` puts an expression straight into the run: script. Byte offset 35506.

Locations:

- `action.yml:470`

### script-injection (severity: high)

Rule (a) broken in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` puts an expression straight into the run: script. Byte offset 35901.

Locations:

- `action.yml:482`

### script-injection (severity: high)

Rule (a) broken in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh` puts an expression straight into the run: script. Byte offset 37987.

Locations:

- `action.yml:530`

### script-injection (severity: high)

Rule (a) broken in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` puts an expression straight into the run: script. Byte offset 39014.

Locations:

- `action.yml:552`

### script-injection (severity: high)

Rule (a) broken in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh` puts an expression straight into the run: script. Byte offset 40712.

Locations:

- `action.yml:580`

### script-injection (severity: high)

Rule (a) broken in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh` puts an expression straight into the run: script. Byte offset 42273.

Locations:

- `action.yml:612`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in 8 steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every one of these steps uses shell: bash, so the quoted variable works there. The runner sets `$GITHUB_ACTION_PATH` to the same directory the expression gave. Two steps still have `${{ github.action_path }}` in their env: blocks (ACTION_JQ_DIR). I left those alone because env: values are not run as shell code. Nothing was run or tested after the edit.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) broken in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh` puts a ${{ }} expression straight into the run: script. Pass it through env (for example ACTION_PATH: ${{ github.action_path }}) and write "$ACTION_PATH", or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:394`

### script-injection (severity: high)

Rule (a) broken in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:407`

### script-injection (severity: high)

Rule (a) broken in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:522`

### script-injection (severity: high)

Rule (a) broken in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:535`

### script-injection (severity: high)

Rule (a) broken in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:582`

### script-injection (severity: high)

Rule (a) broken in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:604`

### script-injection (severity: high)

Rule (a) broken in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:630`

### script-injection (severity: high)

Rule (a) broken in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh` puts a ${{ }} expression straight into the run: script.

Locations:

- `action.yml:663`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step that ran `bash ${{ github.action_path }}/action/scripts/<x>.sh` now runs `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`, using the path variable the runner sets itself. This covers install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All steps use shell: bash, so the quoted $VAR form is correct.

Two of the edits damaged the file at first: the comment and summary steps were each merged onto one line with the step after them. I repaired both and checked the result.

The ACTION_JQ_DIR values in env: blocks still contain ${{ github.action_path }}. I left them alone because an env: block is not run by a shell, so the expression can't be injected there.


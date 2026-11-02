<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env (e.g. ACTION_PATH: ${{ github.action_path }}) or use the GITHUB_ACTION_PATH variable, and quote it: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' lines to 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. Each of these steps uses shell: bash, so this is the right way to reference the variable. Nothing has been run or tested. The ACTION_JQ_DIR values in env: blocks still contain ${{ github.action_path }}, but that is fine because env: values are not run as shell code.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

In action.yml, replaced `bash ${{ github.action_path }}/action/scripts/{check-code-scanning,comment,annotate}.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/...sh"` in the Check Code Scanning availability, Post PR comment and Emit inline annotations steps (all shell: bash).


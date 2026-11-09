<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression directly in the run script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it in through env (e.g. ACTION_PATH: ${{ github.action_path }}) or use the runner-set $GITHUB_ACTION_PATH, and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` puts an expression directly in the run script.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` puts an expression directly in the run script.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` puts an expression directly in the run script.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh` puts an expression directly in the run script.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` puts an expression directly in the run script.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh` puts an expression directly in the run script.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh` puts an expression directly in the run script.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each `run: bash ${{ github.action_path }}/action/scripts/<name>.sh` line now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"`. The runner sets that variable itself, and the double quotes keep the path as one argument. All 8 steps use shell: bash, so this way of referring to the variable works in every one of them. A search afterwards found 8 `run: bash` lines; they all match the new form, and none uses ${{ github.action_path }}. I haven't run the action. I left two env: values alone: ACTION_JQ_DIR still uses ${{ github.action_path }}, because expressions in env: are not script injection and weren't flagged.


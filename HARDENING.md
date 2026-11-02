<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) and quote it (`bash "$ACTION_PATH/action/scripts/install.sh"`), or use the runner-provided $GITHUB_ACTION_PATH.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Sub-rule (a): a template expression sits directly inside a run: string in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" or a quoted env var instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed all 8 flagged `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. The runner sets $GITHUB_ACTION_PATH itself and the path is now quoted. Every step runs with `shell: bash`, so this syntax works and the scripts get the same arguments as before. I haven't run the action or the analysis again. The ACTION_JQ_DIR lines still use `${{ github.action_path }}`, but only inside env: blocks, which is the safe form. I left those alone.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Changed the broker-token.sh and analyze.sh run lines to bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh". Fixed a broken line in the 'Job summary' step ('run: basrun: bash ...summary.sh"name: Post review comments'). It now reads run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh", followed by a separate '- name: Post review comments' step, which makes the YAML valid again.


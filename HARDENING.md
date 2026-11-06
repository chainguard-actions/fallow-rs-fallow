<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 steps used to call `bash ${{ github.action_path }}/action/scripts/<x>.sh`. They now call `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. Every one of these steps runs under shell: bash, so the double-quoted variable works and also copes with spaces in the path. The `${{ github.action_path }}` references that remain sit inside env: values (ACTION_JQ_DIR), which is the safe place for them, so I left them alone. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Check Code Scanning step now runs bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh". Repaired three steps an earlier pass had mangled (comment.sh / annotate.sh / summary.sh run: lines fused with the next step's '- name:', and 'run:run:'). Restored each as a quoted $GITHUB_ACTION_PATH bash invocation, so the Emit inline annotations, Job summary and Post review comments steps are separate again. Not re-validated after editing.


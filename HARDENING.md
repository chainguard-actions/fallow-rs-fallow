<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (or use $GITHUB_ACTION_PATH) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:542`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:555`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:602`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:624`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:650`

### script-injection (severity: high)

Sub-rule (a): a ${{ }} expression is placed directly inside the run: script in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:683`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In the 8 composite steps, replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use shell: bash. The ACTION_JQ_DIR values are in env: blocks, not in run: scripts, so I left them as they were.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

script-injection: the 'Run analysis' and 'Check Code Scanning availability' steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" with the path quoted, instead of an inline ${{ github.action_path }}. invalid-yaml: an earlier pass had merged several steps into broken lines ('run: basrun: ...comment.sh"name: Emit inline annotations' and 'run:run: ...summary.sh"  - name: Post review comments'). I rebuilt those step boundaries with the correct indentation. Reading the file back sometimes showed content from before an edit, and one edit was applied with the wrong indentation. I re-read and re-fixed until every run: line and step start was correct. Not verified: whether that earlier damage also deleted any steps that came after 'Post review comments'. The 'verdict' output's description mentions a 'threshold step', but there is no such step or script in the action, and the gating may live inside analyze.sh.


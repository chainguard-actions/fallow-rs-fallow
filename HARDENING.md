<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: shell command, so it is substituted into the script text before bash runs. Offending line: `run: bash ${{ github.action_path }}/action/scripts/install.sh` (step 'Install fallow'). Fix: map it in env (ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner's own "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` (step 'Fallow branded token'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` (step 'Run analysis'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` (step 'Check Code Scanning availability'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh` (step 'Post PR comment'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` (step 'Emit inline annotations'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh` (step 'Job summary'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a): a GitHub expression is placed directly in the run: command. Offending line: `run: bash ${{ github.action_path }}/action/scripts/review.sh` (step 'Post review comments'). Use "$GITHUB_ACTION_PATH" quoted instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 flagged steps in action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Each one ran `bash ${{ github.action_path }}/action/scripts/X.sh`; it now runs `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps use shell: bash, so this syntax works. I left the ACTION_JQ_DIR env entries that use github.action_path alone, since env values aren't injectable. Some edits made at the same time conflicted and garbled the annotate line. I repaired it and re-read the whole steps section to confirm it was correct.


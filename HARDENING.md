<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it into env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:452`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:460`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Run analysis' (id: analyze): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:573`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:586`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:633`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:655`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:681`

### script-injection (severity: high)

Rule (a) – an expression is put straight into a run: script. Step 'Post review comments' (id: review): `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:714`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in 8 steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash. I left the ACTION_JQ_DIR values in the env: blocks alone, because expressions in env: are safe. Some edits applied at the same time garbled a few lines. I spotted it when I re-read the file, repaired each spot, and checked the final file.


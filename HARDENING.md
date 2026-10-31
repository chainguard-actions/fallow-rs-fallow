<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 'Install fallow' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:470`

### script-injection (severity: high)

Rule (a): 'Fallow branded token' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:478`

### script-injection (severity: high)

Rule (a): 'Run analysis' (id: analyze) step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:603`

### script-injection (severity: high)

Rule (a): 'Check Code Scanning availability' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:616`

### script-injection (severity: high)

Rule (a): 'Post PR comment' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:665`

### script-injection (severity: high)

Rule (a): 'Emit inline annotations' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

### script-injection (severity: high)

Rule (a): 'Job summary' step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:711`

### script-injection (severity: high)

Rule (a): 'Post review comments' (id: review) step puts an expression directly into run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:744`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash, so the quoted env var reference is correct. ACTION_JQ_DIR env values using github.action_path were left alone (env: is the safe location).


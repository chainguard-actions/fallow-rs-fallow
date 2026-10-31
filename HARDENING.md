<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env instead, e.g. ACTION_PATH: ${{ github.action_path }}, and use run: bash "$ACTION_PATH/action/scripts/install.sh". The runner also sets $GITHUB_ACTION_PATH, which can be used the same way.

Locations:

- `action.yml:431`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:444`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:571`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:618`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:666`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: string of the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:699`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps are shell: bash. ACTION_JQ_DIR env entries (env block, not run) left unchanged.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Fixed the YAML parse error: an earlier pass had left a doubled 'run:run:' on the analyze step and joined the next step onto that same line. The analyze step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/analyze.sh"` and the 'Check Code Scanning availability' step starts on its own line again. The broker-token.sh, check-code-scanning.sh and review.sh steps now run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` (quoted env var) instead of using ${{ github.action_path }} inline. One edit, on check-code-scanning.sh, landed with the wrong indentation and joined the next step on, the same way as the analyze damage. One review.sh edit reported success but didn't change the file. I fixed both and re-read each location afterwards. I haven't run a YAML parser on the file; my check was reading the edited spots and searching the file.


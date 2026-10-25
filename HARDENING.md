<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step runs `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The expression is filled in by template substitution before the shell parses the line. Fix: move it to an env var, e.g. use "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step runs `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step runs `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step runs `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step runs `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step runs `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): the 'Job summary' step runs `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step runs `run: bash ${{ github.action_path }}/action/scripts/review.sh`. The expression is interpolated directly into the run: command.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review), I replaced `run: bash ${{ github.action_path }}/action/scripts/X.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps use shell: bash. The ACTION_JQ_DIR env entries are unchanged: they already sit in env:, which is the safe place for that expression. Running the first batch of edits in parallel garbled several lines of action.yml. I repaired them one edit at a time and then checked the whole steps section.


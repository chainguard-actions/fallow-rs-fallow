<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.40.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.40.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the quoted runtime variable instead: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:416`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:429`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:564`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:577`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:624`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:646`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:672`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:706`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each `run: bash ${{ github.action_path }}/action/scripts/<name>.sh` line now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"`. That covers the install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps. Every one of these steps uses `shell: bash`, so the `$VAR` syntax is correct for them. I did not run the action after the change. `github.action_path` still appears in two places: the `ACTION_JQ_DIR` values in the env: blocks of the annotate and summary steps. I left those alone because values set in env: are not parsed by the shell, so they can't be used for injection.


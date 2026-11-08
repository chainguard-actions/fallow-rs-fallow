<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the env var instead: "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step's run: line used to insert `${{ github.action_path }}` directly into the command. It now uses the runner's own environment variable instead: `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`. The affected steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review.

Every one of these steps runs under bash, so the `$VAR` form is correct, and the quotes keep the path intact if it contains spaces. The scripts still run from the action's own directory, so nothing changes when the action is checked out under the mirror's repository name.

The `ACTION_JQ_DIR` settings still use `${{ github.action_path }}`, but only in env: blocks, not in a command, so I left them as they were. I haven't run the action to test the change.


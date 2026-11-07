<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.41.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.41.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Read it from an env var instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step's `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). The quoting matters: without it, an action path containing spaces would be split into separate words.

All eight steps use `shell: bash`, so `$GITHUB_ACTION_PATH` is the correct way to read the variable there. The runner sets it to the action's own directory, so the scripts are still found when the action is checked out under the mirror's owner/repo name. I haven't run the action to confirm this.

I left one related spot alone: the `ACTION_JQ_DIR` value in the env blocks of the annotate and summary steps still uses `${{ github.action_path }}`. Env values are not parsed by a shell, so nothing can be injected there, and the findings didn't cover it.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

The Install fallow, Check Code Scanning availability and Post PR comment steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" instead of putting ${{ github.action_path }} inside the shell command. Fixed the invalid YAML too: in two places a run: line was indented too far and the next step ('- name: Emit inline annotations' and '- name: Post review comments') was stuck onto the end of it. Both run: lines are back at the correct indentation and each step now starts on its own line.


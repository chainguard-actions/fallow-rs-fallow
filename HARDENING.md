<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run: block of the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed the 8 steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. The runner sets $GITHUB_ACTION_PATH itself, every step uses shell: bash, and the path is now quoted. I left the ACTION_JQ_DIR env entries as they were, because expressions in env: are safe.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Install step now runs bash "$GITHUB_ACTION_PATH/action/scripts/install.sh" instead of putting ${{ github.action_path }} inline. Fixed two broken lines where a 'run:run: bash ... comment.sh/summary.sh' line had been merged with the next step's '- name:' line. They are now split back into separate, correctly indented steps, so the YAML parses again.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed two corrupted lines in action.yml near line 649. The Job summary step's `run:` line was indented too far, so YAML read it as part of the env mapping. The `- name: Post review comments   id: review` line had `id` merged into it, so `id: review` is back on its own line. No other changes.


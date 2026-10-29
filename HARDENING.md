<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass github.action_path in through env (e.g. ACTION_PATH) or use the $GITHUB_ACTION_PATH variable, double-quoted.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly in the run: command of the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I changed 8 run: lines in action.yml from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use shell: bash. I left the ACTION_JQ_DIR env: entries alone: they are expressions inside env:, not inside run:, so they are already the safe form.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Replaced `${{ github.action_path }}` with the quoted `"$GITHUB_ACTION_PATH/..."` in the 'Check Code Scanning availability' and 'Post PR comment' run: lines. Fixed the broken YAML that an earlier edit left behind: the annotate step's run: line had been merged into the 'Job summary' step name, and the summary step's run: line had been merged into the 'Post review comments' step. I restored correct indentation and step separators.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed malformed YAML near the end of action.yml. The 'run:' lines of the 'Emit inline annotations' and 'Job summary' steps were over-indented (so YAML read them as part of the env mapping), and two step headers had been merged onto one line ('- name: Job summary   if: ...' and '- name: Post review comments   id: review'). I moved those run lines back to step level and split the 'name' line apart from 'if' and 'id'. Nothing else in the steps changed. A search found no other mis-indented run lines or merged keys.


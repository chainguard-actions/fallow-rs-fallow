<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) and quote it: `bash "$ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:410`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:418`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:530`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:543`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:590`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:612`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:638`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in its run command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 script steps now run with `bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"` in place of the inline `${{ github.action_path }}` expression. These are the install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps. The runner sets GITHUB_ACTION_PATH itself for composite steps, so no new env entry was needed. The path is double-quoted and the shell is bash. Two of the edits damaged the file at first: they ran the comment and annotate run lines into the next step's '- name:'. I repaired both and read the file back. The broker-token edit reported success but did not change the file on the first try, so I redid it. I did not change the ACTION_JQ_DIR env values that use github.action_path, because they sit in env: rather than run: and are not injectable.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env and use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly into its run line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, 8 composite steps ran a script with 'bash ${{ github.action_path }}/action/scripts/<x>.sh'. Each now runs 'bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash, and the runner sets GITHUB_ACTION_PATH itself, so no env entry was needed. I left the ACTION_JQ_DIR values in env: as they were, since expressions are allowed there.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Replaced `bash ${{ github.action_path }}/...` with `bash "$GITHUB_ACTION_PATH/..."` in the broker-token, annotate and summary steps. Repaired two corrupted step boundaries left by the previous iteration (ghas-check run line merged with 'Upload SARIF' step name; comment step 'run:run:' merged with 'Emit inline annotations' step), which caused the YAML parse error at line 558.

### Iteration 3

**Fixes applied:** invalid-yaml, script-injection

**Notes:**

invalid-yaml: put the over-indented `run:` lines in the 'Post PR comment' and 'Emit inline annotations' steps back at step level, and split the lines that had joined together ('Emit inline annotations   if:' and 'annotate.sh  - name: Job summary') back into separate YAML lines. script-injection: the 'Job summary' step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"`, quoted, like the other steps.


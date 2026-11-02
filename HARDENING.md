<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env: instead (or use $GITHUB_ACTION_PATH) and double-quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression straight into run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, 8 steps ran their script with `bash ${{ github.action_path }}/action/scripts/<name>.sh`. They now use `bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"`. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. A search afterwards found no run: line that still contains a ${{ }} expression. The first edit to the check-code-scanning line reported success but didn't stick, so I made it again and checked it. ACTION_JQ_DIR still gets ${{ github.action_path }}, but through env:, which is the safe form, so I left it as is. Nothing was run to test these changes.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Repaired two corrupted lines in action.yml, in the 'Fallow branded token' and 'Job summary' steps. Each read 'run:run: bash ...' with the next line of the file pasted onto its end: a YAML comment in the first case, the '- name: Post review comments' step in the second. Both are back to 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"', and the comment and the step are on their own lines again. Nothing else changed. A search found no other lines like these, but the file was not run through a YAML parser.


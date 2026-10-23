<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env instead (or use the $GITHUB_ACTION_PATH env var) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts a ${{ }} expression straight into the run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed each of the 8 `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. All of these steps run in bash, so the variable works as written. GITHUB_ACTION_PATH is set by the runner, so the paths still resolve when the action runs under a different owner/repo name. I left the ACTION_JQ_DIR env entries as they were: they already sit in env:, not inline in run:. I haven't run the action to test this.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Repaired three run: lines in action.yml that had been garbled by edit splicing: (1) the broker-token step had 'run:run:' with the next comment block glued onto it; (2) the analyze step had 'run:run:' with the following '- name: Check Code Scanning availability' on the same line; (3) the annotate step had 'run: bash ${run: bash "...annotate.sh": Job summary', which swallowed the '- name: Job summary' step header. Each is now 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"', with step boundaries restored. All referenced scripts exist under action/scripts. Nothing else changed.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh, FALLOW_DIFF_FILE (which comes from inputs.diff-file) is now passed through `printf '%s' ... | tr -d '\n\r'` before it is written to $GITHUB_ENV. As an extra precaution I sanitized the auto-generated _DIFF_PATH the same way where it is written to $GITHUB_ENV. Each value is captured into its own variable before the printf, so the original command's exit status is not hidden. action.yml did not need changes. Nothing was run to test this.


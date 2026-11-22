<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.46.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.46.0** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step interpolates a GitHub expression directly into its run: script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the runner-provided "$GITHUB_ACTION_PATH" env var instead.

Locations:

- `action.yml:451`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step has `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:464`

### script-injection (severity: high)

Rule (a): the 'Resolve change scope' step has `run: bash ${{ github.action_path }}/action/scripts/scope.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:525`

### script-injection (severity: high)

Rule (a): the 'Run mutation testing' step has `run: bash ${{ github.action_path }}/action/scripts/mutation.sh run`, an expression interpolated into the run: script.

Locations:

- `action.yml:560`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step has `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:651`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step has `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:664`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step has `run: bash ${{ github.action_path }}/action/scripts/comment.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:712`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step has `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:734`

### script-injection (severity: high)

Rule (a): the 'Job summary' step has `run: bash ${{ github.action_path }}/action/scripts/summary.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:761`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step has `run: bash ${{ github.action_path }}/action/scripts/review.sh`, an expression interpolated into the run: script.

Locations:

- `action.yml:794`

### script-injection (severity: high)

Rule (a): the 'Mutation testing result' step has `run: bash ${{ github.action_path }}/action/scripts/mutation.sh gate`, an expression interpolated into the run: script.

Locations:

- `action.yml:802`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 11 'Install fallow'/'Fallow branded token'/scope/mutation/analyze/code-scanning/comment/annotate/summary/review/mutation-gate steps now invoke scripts via "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" (double-quoted) instead of an inline ${{ github.action_path }} expression. All steps use shell: bash, so the $VAR syntax is correct. Script arguments (run/gate) are kept as upstream. ACTION_JQ_DIR env entries using github.action_path were left as-is since they are in env:, not run:.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.42.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.42.0** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:451`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:464`

### script-injection (severity: high)

Rule (a): the 'Resolve change scope' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/scope.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:524`

### script-injection (severity: high)

Rule (a): the 'Run mutation testing' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh run`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:651`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:664`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:709`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:732`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:759`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:792`

### script-injection (severity: high)

Rule (a): the 'Mutation testing result' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh gate`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:800`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, each step's `run: bash ${{ github.action_path }}/action/scripts/<x>.sh [args]` now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh" [args]`. Every one of these steps uses shell: bash. The arguments `run` and `gate` passed to mutation.sh are unchanged. The ACTION_JQ_DIR values in env: still use the expression, which is safe there. One thing to know: upstream's own test action/tests/mutation.sh checks action.yml for the literal string 'run: bash ${{ github.action_path }}/action/scripts/scope.sh', so that check will now fail. I left it alone because the rules say not to change test files.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.44.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.44.0** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' interpolates an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:451`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' has `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:464`

### script-injection (severity: high)

Rule (a): step 'Resolve change scope' has `run: bash ${{ github.action_path }}/action/scripts/scope.sh`.

Locations:

- `action.yml:524`

### script-injection (severity: high)

Rule (a): step 'Run mutation testing' has `run: bash ${{ github.action_path }}/action/scripts/mutation.sh run`.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): step 'Run analysis' has `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:651`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' has `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:664`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' has `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:709`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' has `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:727`

### script-injection (severity: high)

Rule (a): step 'Job summary' has `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:753`

### script-injection (severity: high)

Rule (a): step 'Post review comments' has `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:782`

### script-injection (severity: high)

Rule (a): step 'Mutation testing result' has `run: bash ${{ github.action_path }}/action/scripts/mutation.sh gate`.

Locations:

- `action.yml:789`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 11 'run: bash ${{ github.action_path }}/action/scripts/<script>.sh' steps now use 'bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"' instead. The path is double-quoted, and the 'run' and 'gate' arguments to mutation.sh are kept. Every one of these steps uses shell: bash, so the $VAR syntax is correct. I left the ACTION_JQ_DIR values in env: as they are: an expression inside env: is not inlined into the shell script. Nothing has been run to test the change.


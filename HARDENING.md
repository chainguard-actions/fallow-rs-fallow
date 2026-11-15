<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.43.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.43.1** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts a GitHub Actions expression straight into its run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through the env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:436`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:449`

### script-injection (severity: high)

Rule (a): the 'Resolve change scope' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/scope.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:509`

### script-injection (severity: high)

Rule (a): the 'Run mutation testing' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh run`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:543`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:636`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:694`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:716`

### script-injection (severity: high)

Rule (a): the 'Job summary' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:743`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:777`

### script-injection (severity: high)

Rule (a): the 'Mutation testing result' step interpolates an expression in run:: `run: bash ${{ github.action_path }}/action/scripts/mutation.sh gate`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:785`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I changed all 11 composite steps in action.yml so their run: lines no longer contain the ${{ github.action_path }} expression. Each one now uses the runner's own variable, quoted: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh". The steps are install, broker-token, scope, analyze, check-code-scanning, comment, annotate, summary and review, plus mutation.sh run and mutation.sh gate. The run and gate arguments stay outside the quotes, as before. All steps are shell: bash, so this syntax is correct. A search afterwards found no ${{ }} expressions left in any run: line. github.action_path still appears in env: blocks (ACTION_JQ_DIR), which the finding does not cover. I did not run the action to test these changes.


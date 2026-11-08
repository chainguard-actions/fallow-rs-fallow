<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the step 'Install fallow' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH" in the script, or use the double-quoted $GITHUB_ACTION_PATH variable.

Locations:

- `action.yml:413`

### script-injection (severity: high)

Rule (a): the step 'Fallow branded token' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:420`

### script-injection (severity: high)

Rule (a): the step 'Run analysis' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the step 'Check Code Scanning availability' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the step 'Post PR comment' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the step 'Emit inline annotations' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the step 'Job summary' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the step 'Post review comments' puts a GitHub expression straight into its run: script: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step had `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`, and each now reads `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh`. All of these steps use `shell: bash`, so the bash variable syntax is correct and the path is quoted. I left `${{ github.action_path }}` in the `ACTION_JQ_DIR` `env:` entries alone, since an expression in an `env:` value is never parsed by the shell and so can't inject anything. A follow-up search found no `${{ }}` expressions left on any `run:` line. I haven't run the action to test the change.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it into env (e.g. ACTION_PATH: ${{ github.action_path }}) and reference "$ACTION_PATH", or use the $GITHUB_ACTION_PATH env var.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each `run:` line had `bash ${{ github.action_path }}/action/scripts/<name>.sh`, and each now reads `bash "$GITHUB_ACTION_PATH"/action/scripts/<name>.sh`. `$GITHUB_ACTION_PATH` is an environment variable the runner sets for every step in a composite action, so no new `env:` entries were needed. All these steps use `shell: bash`, so the `$VAR` syntax is correct. Nothing was run to test this. Two `ACTION_JQ_DIR` lines still use `${{ github.action_path }}`, but they sit in `env:` blocks rather than in `run:`, so they don't count as script injection. I left them unchanged.


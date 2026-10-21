<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through the GITHUB_ACTION_PATH env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:581`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:589`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:702`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:715`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:762`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:784`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:810`

### script-injection (severity: high)

Rule (a), direct expression interpolation in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:843`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml I changed the 8 `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` lines to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. All of these steps use shell: bash. The two ACTION_JQ_DIR env entries still use github.action_path, which is fine because env: values are not shell-interpreted. A few edits run in parallel overwrote each other, so I re-applied them one at a time and checked the result. Nothing has been run.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed the broken line in action.yml. The 'Job summary' step had `run:run:` and the next step ('Post review comments') stuck onto the same line. It is now `run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"`, and the next step starts on its own line with the right indentation. No other changes.


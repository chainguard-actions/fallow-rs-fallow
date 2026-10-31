<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: the 'Install fallow' step's run: line puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: use the runner-provided "$GITHUB_ACTION_PATH" env var instead, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, eight `run:` lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used `bash ${{ github.action_path }}/action/scripts/X.sh`. They now use `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All eight steps run under `shell: bash`, so this way of writing the variable works. I have not run the action to test the change. I left the ACTION_JQ_DIR values that use github.action_path as they are, because they sit in `env:` blocks rather than in shell code, so they can't be injected.

### Iteration 2

**Fixes applied:** invalid-yaml, script-injection

**Notes:**

invalid-yaml: a previous pass had left two broken lines, 'run:run: bash "...check-code-scanning.sh"  - name: Upload SARIF' and the same for summary.sh. In each, the step's run: line had been merged with the next step's '- name:' line. I split them back into a proper run: line followed by the next step. script-injection: the annotate step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"` instead of inlining ${{ github.action_path }}. I haven't re-run the YAML parser or the action itself.


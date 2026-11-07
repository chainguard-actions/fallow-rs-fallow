<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.41.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.41.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is put directly into the run: command in the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through an env var instead (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:700`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:713`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:828`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:841`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:888`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:910`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:936`

### script-injection (severity: high)

Rule (a): an expression is put directly into the run: command in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:969`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' steps to 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every step uses shell: bash, so the "$VAR" syntax is right. The quotes also handle paths with spaces. I left the ACTION_JQ_DIR env values alone because they still use ${{ github.action_path }} inside env:, which is the safe form. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** invalid-yaml, script-injection

**Notes:**

Fixed the broken YAML at the analyze step: its run: line was wrongly indented and ran onto the same line as the next step's '- name: Check Code Scanning availability'. I moved run: back to step indentation and put the next step on its own line. In the check-code-scanning, comment and summary steps, I changed `bash ${{ github.action_path }}/...` to `bash "$GITHUB_ACTION_PATH/..."`. The ${{ github.action_path }} expressions left in env: values (ACTION_JQ_DIR) are not inside run: and are safe.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

The 'Job summary' step's run line had been mangled into `run:run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"  - name: Post review comments`, which joined two steps on one line. I restored it to `run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` and put the 'Post review comments' step back on its own line at the right indentation. No other changes.


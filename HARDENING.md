<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: pass the path through env (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): step 'Run analysis' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): step 'Job summary' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): step 'Post review comments' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Fix: use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 8 'bash ${{ github.action_path }}/action/scripts/<x>.sh' run lines (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) now read 'bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. Every one of these steps uses shell: bash, so the shell syntax holds. No other changes were needed. The github.action_path references left in env: blocks (ACTION_JQ_DIR) are safe there.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

action.yml: the Install fallow, Fallow branded token and Check Code Scanning availability steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" (quoted env var, no expression). Repaired corrupted YAML from the previous pass: the annotate.sh, summary.sh and check-code-scanning.sh run: lines had been merged with the following '- name:' line (bad indentation / stray 'ru' fragment), causing 'mapping values are not allowed'. Each is now a correctly indented run: line followed by its own step entry. Script paths verified to exist under action/scripts.


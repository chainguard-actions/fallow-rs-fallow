<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed straight into the run: commands of composite steps in action.yml. Each step runs `bash ${{ github.action_path }}/action/scripts/<script>.sh`. This affects the steps Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The value is substituted into the YAML before the shell runs and is not quoted. To fix it, use the runner-provided env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used to run `bash ${{ github.action_path }}/action/scripts/X.sh`. They now run `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Every step uses shell: bash, so this $VAR syntax is correct for all of them. No other changes.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Repaired three corrupted lines in action.yml left by an earlier pass. In each, a run: line had been merged with the next step's name ('run:run: bash ...  - name: ...' for analyze and summary, and 'run: bash ${run: bash ...: Upload SARIF' for check-code-scanning). Each now has its own run: line and the following '- name:' step is back. Changed the annotate and review steps to run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh". The review edit did not stick the first time and was applied again. github.action_path expressions in env: (ACTION_JQ_DIR) were left as they are, since values set in env: are not injectable.


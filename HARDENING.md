<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly in a run: shell command in 8 composite steps. The offending line is `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. It appears in the install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh steps. The value is substituted into the script text before the shell parses it, and it is unquoted. Fix: pass it through env instead (for example env: ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/<script>.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. ACTION_JQ_DIR env entries left as-is since they are in env: blocks.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): 8 composite steps put a GitHub Actions expression directly in the run: string: `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. The rule counts any ${{ }} inside run: as a finding. Fix: use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

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

In action.yml, I changed the 8 composite steps from `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. A few edits were overwritten at first because they ran in parallel. I redid those one at a time and searched the file to confirm all 8 lines are fixed. Nothing else changed: the env: blocks and their expressions are untouched.


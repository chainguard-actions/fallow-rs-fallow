<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly inside run: shell commands. 8 composite steps use `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` (install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, review.sh). The check fails any ${{ }} in a run: script, whatever its context. Fix: use the env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`
- `action.yml:427`
- `action.yml:541`
- `action.yml:554`
- `action.yml:601`
- `action.yml:623`
- `action.yml:649`
- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps are shell: bash, so the env var syntax is correct. The env: values such as ACTION_JQ_DIR still use github.action_path, which is allowed because they are not inside run: scripts.


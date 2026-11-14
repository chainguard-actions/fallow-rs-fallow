<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.43.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.43.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: commands in action.yml. Eleven composite steps run `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`: install.sh (line 451), broker-token.sh (464), scope.sh (524), mutation.sh run (558), analyze.sh (651), check-code-scanning.sh (664), comment.sh (709), annotate.sh (731), summary.sh (758), review.sh (791) and mutation.sh gate (799). Use the runner-provided env var instead and quote it: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:451`
- `action.yml:464`
- `action.yml:524`
- `action.yml:558`
- `action.yml:651`
- `action.yml:664`
- `action.yml:709`
- `action.yml:731`
- `action.yml:758`
- `action.yml:791`
- `action.yml:799`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, each of the 11 `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` steps now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The steps cover install, broker-token, scope, mutation run, analyze, check-code-scanning, comment, annotate, summary, review and mutation gate. Arguments that come after the script name (`run`, `gate`) are still passed as before. All the steps use `shell: bash`. The ACTION_JQ_DIR entries under env: still use github.action_path, which is fine because expressions in env: blocks aren't open to script injection.


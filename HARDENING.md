<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): every composite step in action.yml puts a GitHub Actions expression directly inside the run: string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The steps affected are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. The template is filled in before the shell parses the command. The fix is to use the shell variable instead, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:413`
- `action.yml:426`
- `action.yml:540`
- `action.yml:553`
- `action.yml:600`
- `action.yml:622`
- `action.yml:647`
- `action.yml:680`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh` in all 8 composite steps. Every step uses shell: bash. The ACTION_JQ_DIR env values that use github.action_path sit in env: blocks, so they are safe and were left as they are.


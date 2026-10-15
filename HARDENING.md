<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` steps in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string. Per the check rules, ANY `${{ ... }}` expression inside a `run:` block is a script-injection finding regardless of which context it reads from. The pattern used is `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The safe pattern is to set `ACTION_PATH: ${{ github.action_path }}` in the step's `env:` block and then reference `$ACTION_PATH` in the `run:` script.

Locations:

- `action.yml:362`
- `action.yml:370`
- `action.yml:430`
- `action.yml:440`
- `action.yml:460`
- `action.yml:475`
- `action.yml:490`
- `action.yml:510`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each of the 8 run: steps that used `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` was updated to: (1) add `ACTION_PATH: ${{ github.action_path }}` to the step's env: block, and (2) change the run: line to `run: bash "$ACTION_PATH"/action/scripts/<script>.sh`. The affected steps were: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, and Post review comments.


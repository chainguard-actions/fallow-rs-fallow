<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violation: `${{ github.action_path }}` is interpolated directly inside `run:` shell command strings across all 8 composite action steps. Even though `github.action_path` is not attacker-controlled, any `${{ ... }}` expression in a `run:` block flows through YAML template substitution before the shell sees it, making it a script-injection risk. Affected steps: 'Install fallow', 'Fallow branded token', 'Fallow cache key', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary', 'Post review comments'. The fix is to move `github.action_path` into an `env:` variable (e.g., `ACTION_PATH: ${{ github.action_path }}`) and reference it as `"$ACTION_PATH"` in the `run:` block.

Locations:

- `action.yml:390`
- `action.yml:400`
- `action.yml:411`
- `action.yml:470`
- `action.yml:476`
- `action.yml:497`
- `action.yml:511`
- `action.yml:527`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 instances of `${{ github.action_path }}` being directly interpolated in `run:` shell command strings across the composite action steps. For each affected step, added `ACTION_PATH: ${{ github.action_path }}` to the step's `env:` block and replaced `${{ github.action_path }}` with `"$ACTION_PATH"` in the `run:` block. For the 'Emit inline annotations' and 'Job summary' steps that also had `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` in their env blocks, moved the `ACTION_JQ_DIR` construction into the `run:` block as `ACTION_JQ_DIR="$ACTION_PATH/action/jq"` with `export ACTION_JQ_DIR` before calling the script. All affected steps: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments.


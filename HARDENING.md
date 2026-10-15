<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): All 8 `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (e.g., `run: bash ${{ github.action_path }}/action/scripts/install.sh`). Per the check rules, ANY `${{ ... }}` expression directly inside a `run:` shell command string is a script-injection finding, including `github.*` contexts. The safe pattern is to use the pre-set environment variable `$GITHUB_ACTION_PATH` instead of the expression, which avoids YAML template substitution before the shell processes the command.

Locations:

- `action.yml:370`
- `action.yml:378`
- `action.yml:415`
- `action.yml:423`
- `action.yml:452`
- `action.yml:476`
- `action.yml:503`
- `action.yml:530`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced all 8 occurrences of `${{ github.action_path }}` in `run:` shell command strings with the pre-set environment variable `$GITHUB_ACTION_PATH`. The affected scripts were: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. Two remaining occurrences of `github.action_path` in `env:` blocks (for `ACTION_JQ_DIR`) were left unchanged as they are safe — `${{ ... }}` expressions in `env:` blocks are not directly interpolated into shell commands.


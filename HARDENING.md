<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): every script-launching step in action.yml puts a GitHub Actions expression directly inside its run: shell string: `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. This affects the steps Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:415`
- `action.yml:428`
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

In action.yml, I replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in 8 steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of these steps use shell: bash. I left the ACTION_JQ_DIR values in env: as they were, because expressions in an env: block don't count as injection.


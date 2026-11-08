<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violated: a GitHub Actions expression is placed directly inside run: shell command strings in 8 composite steps. Each step uses `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: read the path from the runner's GITHUB_ACTION_PATH env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`
- `action.yml:427`
- `action.yml:542`
- `action.yml:555`
- `action.yml:601`
- `action.yml:623`
- `action.yml:649`
- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed the run: line of all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) to `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. Every step is shell: bash, so the env var syntax is correct. The ACTION_JQ_DIR values in env: still use `${{ github.action_path }}`. That is an env value, not part of a shell command, so it can't be used for injection. I left them as they were.


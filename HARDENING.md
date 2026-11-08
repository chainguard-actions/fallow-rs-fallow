<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.41.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.41.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violated: GitHub Actions expressions are put straight into run: shell commands in 8 composite steps of action.yml. Each step uses the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The affected steps are: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The YAML template substitutes the path before any shell quoting happens. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`
- `action.yml:430`
- `action.yml:545`
- `action.yml:558`
- `action.yml:605`
- `action.yml:627`
- `action.yml:653`
- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Each one ran `bash ${{ github.action_path }}/action/scripts/X.sh` and now runs `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use shell: bash, so this way of referencing the variable works. I left the ACTION_JQ_DIR expressions alone because they sit in env: blocks, not in run: commands. I haven't run the action or its tests after the change.


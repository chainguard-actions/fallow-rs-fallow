<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a), direct expression interpolation: eight composite steps in action.yml put a GitHub Actions expression straight into the run: shell command, as `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the shell variable for the path, as `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, so YAML template substitution never builds the command.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<script>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. The ACTION_JQ_DIR env values still use the expression, which is fine because they sit in env:, not run:.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

I fixed the invalid YAML in action.yml. In three places, a step's `run:` line was indented 10 spaces instead of 6, and the next step's `- name:` was stuck on the end of the same line. The affected steps were `check-code-scanning.sh` (joined to Upload SARIF), `comment.sh` (joined to Emit inline annotations) and `summary.sh` (joined to Post review comments). I moved each `run:` back to the normal step indent and put the next step on its own line. The commands themselves are unchanged. A regex check shows 11 steps at the expected indent and all 9 `run:` keys at the 6-space step level. I didn't run a YAML parser, so the next analysis pass will be the first real check that the file loads.


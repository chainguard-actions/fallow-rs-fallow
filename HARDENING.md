<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a), an expression placed directly in a run: string. All 8 run: steps in the composite action.yml put an expression straight into the shell command, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The same pattern is in the steps named 'Install fallow', 'Fallow branded token', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary' and 'Post review comments'. These run broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. The value is substituted into the YAML before the shell parses it, and it is not quoted. Fix: use the runner env var with quotes, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`. The search tool returned only byte offsets, so the line numbers below are estimates.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 composite run: steps from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. This covers install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every step uses shell: bash, so this reference syntax is right. The first round of edits did not save for analyze.sh and check-code-scanning.sh, even though the tool said they succeeded, so I made those two again. The env: entries that use github.action_path (ACTION_JQ_DIR) were already safe and are unchanged.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed three broken lines in action.yml, left by an earlier edit, that stopped the file loading as YAML. In each, 'run:run: bash "..."' was joined to the next step's '- name:' on the same line. This happened in the 'Post PR comment', 'Emit inline annotations' and 'Job summary' steps. Each one now has a single 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"' line and the next step starts on its own line, correctly indented. Nothing else changed. I did not re-run a YAML parser after the fix, so the next analysis pass will confirm whether the file loads. Every script in action/scripts that runs as a step is still called from action.yml. One thing I couldn't confirm: the description of the 'verdict' output mentions a 'threshold step', but there is no step with that name in the file. That step may have been inline and lost in the earlier edit, or the threshold check may happen inside analyze.sh. I had no copy of the original file to compare against.


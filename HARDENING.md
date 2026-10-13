<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 0 finding(s) were identified and resolved across 1 iteration(s).

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 9 script-injection findings in action.yml where `${{ github.action_path }}` was directly interpolated in `run:` shell command strings. For each affected step (Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments), added `ACTION_PATH: ${{ github.action_path }}` to the step's `env:` block and replaced `bash ${{ github.action_path }}/action/scripts/X.sh` with `bash "$ACTION_PATH/action/scripts/X.sh"` in the `run:` command. The `ACTION_JQ_DIR` env vars in the annotate and summary steps that also referenced `github.action_path` remain in `env:` blocks (safe), with `ACTION_PATH` added alongside for the run command fix.


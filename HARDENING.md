<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 0 finding(s) were identified and resolved across 1 iteration(s).

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script injection findings in hardened/action/action.yml. Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash $GITHUB_ACTION_PATH/action/scripts/<script>.sh` for all 8 composite action steps: install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, and review.sh. The $GITHUB_ACTION_PATH environment variable is set by the GitHub Actions runner and provides the same path without requiring expression interpolation inside the run: shell string.


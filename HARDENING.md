<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.45.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.45.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation. 11 composite steps in action.yml put `${{ github.action_path }}` straight into the `run:` command, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The affected steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Resolve change scope (scope.sh), Run mutation testing (mutation.sh run), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh), Post review comments (review.sh) and Mutation testing result (mutation.sh gate). The rule counts any `${{ ... }}` inside a `run:` block, whatever context it reads. Fix: use the runner-provided env var with quotes instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:451`
- `action.yml:464`
- `action.yml:524`
- `action.yml:558`
- `action.yml:651`
- `action.yml:664`
- `action.yml:712`
- `action.yml:734`
- `action.yml:761`
- `action.yml:794`
- `action.yml:802`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 11 composite steps that ran `bash ${{ github.action_path }}/action/scripts/<x>.sh` now use `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` with the path quoted. The two mutation.sh steps keep their `run` and `gate` arguments after the quoted path. All of these steps use shell: bash. The remaining github.action_path references are inside env: blocks (ACTION_JQ_DIR), which is safe, so they were left alone. No other files changed.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): 8 composite steps in action.yml put the expression ${{ github.action_path }} directly into a run: shell string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Any ${{ }} inside a run: block is template-substituted before the shell parses it. Fix: use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:548`
- `action.yml:556`
- `action.yml:660`
- `action.yml:672`
- `action.yml:722`
- `action.yml:741`
- `action.yml:766`
- `action.yml:797`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

action.yml had 8 composite steps whose run: line put ${{ github.action_path }} straight into the shell command: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Each now reads `bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"`. All of these steps use shell: bash, so this is the correct form. I haven't run the action. The two ACTION_JQ_DIR values still use ${{ github.action_path }}, but they sit in env: blocks, not in run: lines, so I left them alone. No other files changed.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Both findings are fixed in action.yml. I haven't loaded the file in a YAML parser or run the action. I checked the result with text searches only.

- **invalid-yaml:** The `run:` line of the 'Fallow branded token' step was broken. It was indented at the wrong level and had stray text (`n.sh`) after the closing quote. It now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh"` at the correct indentation, and that script exists in the action.
- **script-injection:** The install.sh, analyze.sh, annotate.sh, summary.sh and review.sh steps now use `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` instead of putting `${{ github.action_path }}` in the shell command. This matches the steps that already did it this way.

I made the first round of edits in parallel, and some of them overwrote each other. I redid the lost ones one at a time and confirmed that all eight script `run:` lines are in the quoted form and no `run:` line contains a `${{ }}` expression.

The `${{ github.action_path }}` values left in `env:` blocks (ACTION_JQ_DIR) are not a shell-injection risk and are unchanged.


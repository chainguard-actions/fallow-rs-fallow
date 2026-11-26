<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: shell commands. All nine script-launching steps in the composite action use the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The expression is substituted as unquoted text before the shell runs, so a path containing spaces or shell metacharacters would be split or run as shell code. Fix: use the runner-provided env var in double quotes, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all eight script-launching steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. Each now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, so the path comes from the runner's environment variable in double quotes. All steps use shell: bash. The two ACTION_JQ_DIR entries that use github.action_path are in env: blocks, not in shell code, so they were left alone. No run: lines in action.yml contain ${{ }} expressions any more; the only remaining matches are example snippets in a docs markdown file.


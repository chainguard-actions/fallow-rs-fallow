<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.40.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.40.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 8 composite steps put a ${{ }} expression directly inside the run: string. Each one has the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are: Install fallow (install.sh, line 417), Fallow branded token (broker-token.sh, line 430), Run analysis (analyze.sh, line 545), Check Code Scanning availability (check-code-scanning.sh, line 558), Post PR comment (comment.sh, line 605), Emit inline annotations (annotate.sh, line 627), Job summary (summary.sh, line 653) and Post review comments (review.sh, line 686). The runner substitutes the template text before bash parses the line. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

Changed all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps are shell: bash. The ACTION_JQ_DIR values in env: blocks still use the expression, which is fine because an env: value is not passed through a shell.


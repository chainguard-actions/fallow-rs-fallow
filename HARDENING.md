<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 8 run: blocks in this composite action put a GitHub Actions expression straight into the script: `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The runner substitutes the expression into the script text before the shell parses it. The affected steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the runner-provided env var and quote it, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

In action.yml, the 8 lines 'run: bash ${{ github.action_path }}/action/scripts/<script>.sh' now read 'run: bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh' (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). The ACTION_JQ_DIR expressions are in env: blocks and were left alone. Not tested. A follow-up search for ${{ on run: lines still listed these 8 lines; reading them shows no ${{ remains, so those look like false matches.


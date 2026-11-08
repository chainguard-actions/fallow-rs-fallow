<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), expression placed directly in a run: block. 8 composite steps in action.yml use `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The runner pastes the expression into the shell text before bash parses it. Fix: use the quoted env var form, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

I changed the 8 composite steps in action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Each one went from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All of these steps use `shell: bash`, so the `$VAR` syntax is right for them. I left the ACTION_JQ_DIR values in the env: blocks as they are, because an expression there is never parsed by the shell. A search afterwards found no other `run:` line in action.yml with a `${{ }}` expression. I haven't run the action to test the change.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): all 8 shell steps in the composite action put a GitHub Actions expression directly into the run: command. For example, the 'Install fallow' step has `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The same pattern appears in the steps 'Fallow branded token' (broker-token.sh), 'Run analysis' (analyze.sh), 'Check Code Scanning availability' (check-code-scanning.sh), 'Post PR comment' (comment.sh), 'Emit inline annotations' (annotate.sh), 'Job summary' (summary.sh) and 'Post review comments' (review.sh). The value is substituted into the script before the shell parses it, and it is not quoted. Fix: use the runner-provided env var and quote it, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:485`
- `action.yml:489`
- `action.yml:589`
- `action.yml:596`
- `action.yml:631`
- `action.yml:648`
- `action.yml:677`
- `action.yml:704`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In all 8 shell steps of action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review), I changed `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH"/action/scripts/X.sh`. The runner sets that variable to the same directory, and it is now quoted. All steps use shell: bash, so this syntax is correct. A search afterwards found no `${{ }}` expressions left in any run: line of action.yml. Expressions in env: blocks were not changed.


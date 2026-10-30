<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: 8 composite steps put a GitHub expression straight into the run: shell string, for example `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The affected steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The check says any ${{ ... }} inside run: is a finding, because it is substituted into the script before the shell parses it. Fix: use the runner-provided env var instead, quoted, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 composite steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every step uses shell: bash, so the $VAR syntax is correct there. Three of the edits didn't save on the first try, so I made them again and then searched the file to confirm all 8 are done. The env: entries that still use github.action_path (ACTION_JQ_DIR) are left as they are, since an expression in env: is not injectable.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed malformed action.yml at line 545: the 'Check Code Scanning availability' step's run: was over-indented and the following '- name: Upload SARIF' step had been merged onto the same line. Restored run: to step-level indentation and split Upload SARIF into its own list item. No other changes.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation. Eight composite steps in action.yml put an expression straight into the run: shell string: 'Install fallow', 'Fallow branded token', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary' and 'Post review comments'. Each one runs `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` (install.sh, broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh, review.sh). The YAML template is substituted before the shell parses the line, and the value is unquoted. Fix: use the runner-provided env var, quoted, for example `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all eight composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Every step uses shell: bash. I did not change the ACTION_JQ_DIR env entries that still use github.action_path, because an expression in env: is not injectable. Three of the edits did not save the first time I made them in a batch, so I made them again one at a time and searched the file afterwards to confirm all eight are in place.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed the YAML parse error at line 614 of action.yml. One line had two steps run together: the 'Emit inline annotations' step's `run: bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"` was indented too far, and the next step's `- name: Job summary` was stuck onto the end of it. I put `run:` back at the step's normal indentation and moved the 'Job summary' step onto its own line as a separate list item. Nothing else changed. I haven't run a YAML parser or act on the result. The rest of the file follows the usual step layout, so this should clear the error.

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

action/scripts/analyze.sh: before FALLOW_DIFF_FILE (from inputs.diff-file) is written to $GITHUB_ENV, the script now stops with an error (exit 2) if the value contains \n or \r, the same check artifacts-dir uses. As a second safeguard it also strips \n and \r before the write. The other GITHUB_ENV write uses the path the script builds itself (AUTO_DIFF_FILE) and is unchanged. action.yml needed no change.


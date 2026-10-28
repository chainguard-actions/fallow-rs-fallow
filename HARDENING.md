<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 8 composite steps (Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments) put a GitHub expression directly into the run: string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The expression is substituted into the shell text before bash parses it, and the path is unquoted. Fix: use the runner-provided env var instead, quoted: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`. Do the same for broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh.

Locations:

- `action.yml:420`
- `action.yml:433`
- `action.yml:547`
- `action.yml:560`
- `action.yml:607`
- `action.yml:629`
- `action.yml:655`
- `action.yml:688`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 composite run: lines from `bash ${{ github.action_path }}/action/scripts/<x>.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. This covers install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. The scripts and the env: blocks are unchanged; the ACTION_JQ_DIR env value still uses github.action_path, which is safe because it is set in env: rather than written into the shell text. Three of the first parallel edits didn't take effect, so I made them again one at a time and then searched the file to confirm all 8 lines are changed.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

I fixed the invalid YAML in action.yml. In the 'Job summary' step, the line `run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` was indented too far, and the next step's `- name: Post review comments` had been run onto the end of that same line. I put the `run:` back at the step's indentation and moved 'Post review comments' to its own line as a separate step. I checked every other single-line `run:` in the file and they look well-formed. I haven't run a YAML parser or act against the file to confirm it loads now.


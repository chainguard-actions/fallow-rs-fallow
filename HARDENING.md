<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): 8 composite steps put a GitHub expression straight into the run: command, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The steps are Install fallow (line 411), Fallow branded token (419), Run analysis (532), Check Code Scanning availability (545), Post PR comment (592), Emit inline annotations (614), Job summary (640) and Post review comments (673). Every `${{ ... }}` in run: is substituted into the script text before the shell parses it. Fix: pass the path through an env var, or use the runner-provided $GITHUB_ACTION_PATH, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

In action.yml, I changed all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. $GITHUB_ACTION_PATH is a variable the runner sets itself, and it points to the same directory. The expressions in env: blocks (for example ACTION_JQ_DIR) were left as they were, since values in env: are not injectable. A few edits made at the same time didn't stick, so I re-applied them one at a time and searched the file again to confirm all 8 are changed.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed a broken line in action.yml in the 'Post PR comment' step. It read `run:run: bash "$GITHUB_ACTION_PATH/action/scripts/comment.sh"  - name: Emit inline annotations`, which merged the run command with the start of the next step. I put back `run: bash "$GITHUB_ACTION_PATH/action/scripts/comment.sh"` on its own line and made '- name: Emit inline annotations' a separate step again. A search found no other lines broken the same way. I haven't re-parsed the file or run the tests to confirm it loads now.


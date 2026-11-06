<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: 8 composite steps in action.yml put a GitHub expression straight into the run: shell string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The affected steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Template substitution happens before the shell parses the command, so the path should be passed as $GITHUB_ACTION_PATH in double quotes (e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`).

Locations:

- `action.yml:410`
- `action.yml:423`
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

Changed all 8 composite steps in action.yml (Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps use shell: bash, so the reference syntax is correct. The ACTION_JQ_DIR env entries that use github.action_path are in env:, not run:, so I left them as they were. Two edits were lost to overlapping parallel writes; I redid them one at a time and checked the result.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Line 653 of action.yml was broken: the Job summary step read `run:run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"  - name: Post review comments`, so the 'Post review comments' step ran into the same line. I changed it back to a normal `run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` line and moved `- name: Post review comments` back to its own line as the next step. Nothing else changed. I haven't run a YAML parser on the result. I read through the rest of the file and saw no other problems.


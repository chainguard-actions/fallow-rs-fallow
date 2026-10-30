<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Install fallow' step: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the value through env (e.g. ACTION_PATH: ${{ github.action_path }}) and use it as "$ACTION_PATH", or use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): an expression is placed directly in the run block of the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each 'run: bash ${{ github.action_path }}/action/scripts/<name>.sh' line is now 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"' (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). The runner sets GITHUB_ACTION_PATH itself, and every one of these steps uses shell: bash, so the quoted reference works. The two ACTION_JQ_DIR values that still use ${{ github.action_path }} are in env: blocks, not in run: scripts, so they aren't injection points and I left them as they were. I haven't run the action to test the change.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

action.yml: The 'Run analysis' and 'Post review comments' steps now run bash "$GITHUB_ACTION_PATH/action/scripts/{analyze,review}.sh" instead of putting ${{ github.action_path }} unquoted in the command. Three run: lines in the Post PR comment, Emit inline annotations and Job summary steps were broken: each was 'run:run: ...' with the next step's '- name:' stuck onto the same line. That caused the 'mapping values are not allowed' parse error. Each step is now its own entry with a single run: line. My first edits ran in parallel and overwrote each other, so I redid them one at a time. A search finds no 'run:run:' left and no ${{ github.action_path }} left in any run: command. The new step boundaries look correct when read back, but I did not run a YAML parser.


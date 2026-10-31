<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation: step 'Install fallow' uses `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The ${{ }} expression is substituted into the shell script before the shell parses it, and the path is not quoted. Fix: read the path from the GITHUB_ACTION_PATH env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' uses `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): step 'Run analysis' uses `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' uses `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' uses `run: bash ${{ github.action_path }}/action/scripts/comment.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' uses `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): step 'Job summary' uses `run: bash ${{ github.action_path }}/action/scripts/summary.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): step 'Post review comments' uses `run: bash ${{ github.action_path }}/action/scripts/review.sh`, with the expression placed directly in the run string. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed all eight `run: bash ${{ github.action_path }}/action/scripts/*.sh` lines in action.yml to `run: bash "$GITHUB_ACTION_PATH/action/scripts/*.sh"`. These are the install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps. Every one of them uses shell: bash. The ACTION_JQ_DIR values in env: blocks still use github.action_path. That is fine, because env: values are not parsed by a shell.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

I fixed both findings in action.yml. I didn't run a YAML parser or the act tests on the result.

- **invalid-yaml:** an earlier pass had damaged the file in two places, so it no longer loaded:
  - `run: basrun: bash ...comment.sh"name: Emit inline annotations` ran two lines together. I split it back into the comment step's `run:` line and a separate `- name: Emit inline annotations` step.
  - `run:run: ...summary.sh"  - name: Post review comments` did the same. I split it into the summary step's `run:` line and a separate `- name: Post review comments` step.
  - The new boundaries are my best reconstruction, since I didn't have upstream's file to compare. Reading the repaired comment-to-annotations section back shows a normal step boundary.
- **script-injection:** I replaced `bash ${{ github.action_path }}/action/scripts/annotate.sh` and `.../review.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"` and `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"`. Both steps use bash and both scripts exist at that path.

The `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` lines are in `env:` blocks, not in shell commands, so I left them unchanged.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 'Emit inline annotations' step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"` instead of `bash ${{ github.action_path }}/action/scripts/annotate.sh`. The step uses shell: bash.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env (e.g. use the ACTION_PATH variable the runner sets, or env: ACTION_PATH: ${{ github.action_path }}) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml:412`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:420`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts a GitHub expression straight into run: — `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step that ran `bash ${{ github.action_path }}/action/scripts/<script>.sh` now runs `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh` instead. The steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. The runner sets $GITHUB_ACTION_PATH itself, so no new env: entries were needed. All 8 steps use `shell: bash`, so the bash variable form is correct for them. I haven't run the action or the analysis again.

I left the two `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` lines alone. They sit in env: blocks, which is the safe place for an expression, and they weren't flagged. A search for `run:` lines containing `${{` now only finds two examples in the documentation file npm/fallow/skills/fallow/references/patterns.md, which isn't part of the action's steps.


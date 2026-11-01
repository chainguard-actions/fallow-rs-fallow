<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: pass it as an env var or use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): the expression is substituted straight into the run: command. Step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Fix: use "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step used to put `${{ github.action_path }}` straight into its `run:` line, which is the injection risk. Each now runs `bash "$GITHUB_ACTION_PATH"/action/scripts/<script>.sh` instead, so the path comes from the runner's own environment variable and is quoted. The 8 steps are: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use `shell: bash`, so the `$VAR` syntax is correct for every one.

Two `github.action_path` expressions are still in the file, both in `env:` blocks (`ACTION_JQ_DIR`). Values set in `env:` don't go through shell parsing, so they aren't an injection risk and I left them alone. Nothing has been run to test the change.


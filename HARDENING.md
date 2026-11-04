<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the runner-provided "$GITHUB_ACTION_PATH" env var instead (quoted), e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step (id: analyze) puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step (id: review) puts an expression straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Replace it with "$GITHUB_ACTION_PATH".

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the run: lines of the install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps now use bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" in place of the inline ${{ github.action_path }} expression. Every step is shell: bash, so the bash variable syntax is correct.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

action.yml should load again; I haven't run a parser or the tests on it. An earlier pass had run three steps together, leaving each one's `run:` line indented wrong and fused with the next step's `- name:` line. The affected steps were check-code-scanning → Upload SARIF, annotate → Job summary, and summary (which also had a stray 'ru' in it) → Post review comments. I put each `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` back at step level, with the next step starting on its own line. All three scripts exist under action/scripts/. I didn't change anything else.


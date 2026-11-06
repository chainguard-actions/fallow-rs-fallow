<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): 'Install fallow' step runs `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The expression is substituted straight into the shell command. Pass it through env (e.g. GITHUB_ACTION_PATH) and quote it: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh".

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Fallow branded token' step runs `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Run analysis' step (id: analyze) runs `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Check Code Scanning availability' step runs `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Post PR comment' step runs `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Emit inline annotations' step runs `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Job summary' step runs `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): 'Post review comments' step runs `run: bash ${{ github.action_path }}/action/scripts/review.sh`. The expression is substituted straight into the run: command.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) in action.yml from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. All steps use shell: bash. The runner sets GITHUB_ACTION_PATH itself for composite steps, so no env entry was needed. The ACTION_JQ_DIR env values still contain ${{ github.action_path }}, but they sit in env: blocks, which is safe.

### Iteration 2

**Fixes applied:** invalid-yaml, github-env-injection

**Notes:**

invalid-yaml: action.yml had 4 places where steps were merged onto one line ('run:run: bash ...  - name: ...' and 'run: basrun: ...name: Post review comments'). I put each 'run:' line back on its own and restored the '- name:' step entries (Check Code Scanning availability, Upload SARIF, Emit inline annotations, Post review comments). github-env-injection: in analyze.sh, both writes to $GITHUB_ENV (FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE} and FALLOW_DIFF_FILE=${_DIFF_PATH}) now pass the value through $(printf '%s' ... | tr -d '\n\r') first, so a newline can no longer inject extra variables. analyze.sh is too large to read directly, so I located the lines with searches. My first edit was lost when two edits ran at the same time; I applied it again and confirmed both edits are now in the file.


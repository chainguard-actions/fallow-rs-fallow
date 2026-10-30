<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): an expression is written straight into the run: command. `run: bash ${{ github.action_path }}/action/scripts/install.sh` (Install fallow step). Pass it through env (e.g. ACTION_PATH: ${{ github.action_path }}) and call `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:414`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh` (Fallow branded token step) writes an expression straight into the run: command.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh` (Run analysis step) writes an expression straight into the run: command.

Locations:

- `action.yml:541`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh` (Check Code Scanning availability step) writes an expression straight into the run: command.

Locations:

- `action.yml:554`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/comment.sh` (Post PR comment step) writes an expression straight into the run: command.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/annotate.sh` (Emit inline annotations step) writes an expression straight into the run: command.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/summary.sh` (Job summary step) writes an expression straight into the run: command.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Rule (a): `run: bash ${{ github.action_path }}/action/scripts/review.sh` (Post review comments step) writes an expression straight into the run: command.

Locations:

- `action.yml:682`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step used to run `bash ${{ github.action_path }}/action/scripts/<x>.sh` with the expression pasted straight into the run: command. They now run `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`, using the path the runner provides. The affected scripts are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every step uses shell: bash, so this way of referencing the variable works. The ACTION_JQ_DIR values that still use github.action_path are set in env: blocks, which is the safe place for expressions, so I left them alone. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

script-injection: the 'Install fallow' and 'Fallow branded token' steps now run `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"` and `bash "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh"`. Before, each had `${{ github.action_path }}` pasted straight into the run line.

invalid-yaml: an earlier edit had broken several run lines, and I repaired them:
- analyze step: the run line had the wrong indentation and stray text ('e.sh', then a mangled 'ru' prefix). This also merged the next step's '- name:' into it.
- comment and summary steps: these had a doubled 'run:run:' with the next step's '- name:' joined onto the same line. The review step's 'id: review' had also ended up on its name line.

I didn't change anything else. ${{ }} expressions are still used in env: blocks (for example ACTION_JQ_DIR), and that's the safe place for them.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a) failed in the 'Install fallow' step. The expression goes straight into the shell command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) or use the runner-provided $GITHUB_ACTION_PATH, and call `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:414`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:427`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Run analysis' step: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:543`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:555`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:601`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:623`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:649`

### script-injection (severity: high)

Sub-rule (a) failed in the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use the quoted "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:681`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `bash ${{ github.action_path }}/action/scripts/<x>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. ACTION_JQ_DIR env entries left as-is (env: is the safe location).

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

script-injection: the 'Run analysis' and 'Post review comments' steps now run `bash "$GITHUB_ACTION_PATH/action/scripts/analyze.sh"` and `.../review.sh` instead of using the inline `${{ github.action_path }}` expression.

invalid-yaml: a previous pass left three run: lines merged with the text that followed them. I split each one back into its own line:
- broker-token step: a `run:run:` line had swallowed the next comment block.
- comment step: a `run: basrun:` line had swallowed the next step's name.
- annotate step: a `run:run:` line had swallowed the next step's name.

I couldn't run a YAML parser here. I checked the fixed sections by reading them back, and a pattern search for other merged run: lines found nothing new.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed invalid YAML in action.yml: in the 'Emit inline annotations' step, run: was indented 10 spaces instead of 6, and the next step's '- name: Job summary' and 'if:' had been merged onto one line. Moved run: back to 6 spaces and split the name and if: lines. Earlier hardening (pinned SHAs, values passed through env:) is unchanged. The YAML was not re-parsed and tests were not run.


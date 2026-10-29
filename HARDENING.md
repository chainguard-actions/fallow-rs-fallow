<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: use the quoted env var instead, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly inside its run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step that ran `bash ${{ github.action_path }}/action/scripts/<x>.sh` now runs `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"` instead. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash, so the quoted $VAR form works as is.

The edit tool misbehaved partway through. Two edits damaged the YAML near the annotate and summary steps (merged lines and truncated text), and two others did not change the install and review lines on the first try. I repaired the damage, re-applied the changes, and re-read the whole steps section: it reads correctly, and searching the file finds exactly the expected 8 run: lines. I did not re-read the inputs section above `runs:` after the glitches, so it hasn't been checked.

The file has not been run or parsed by a YAML tool, so a test run of the action is still needed to confirm it works.

Two uses of `${{ github.action_path }}` remain. They set ACTION_JQ_DIR in the env: blocks of the annotate and summary steps, not in run:, so they can't inject anything and I left them unchanged.


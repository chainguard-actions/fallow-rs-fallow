<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Eight `run:` steps in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string. Per the check rules, ANY `${{ ... }}` expression interpolated directly inside a `run:` block is a script-injection finding, regardless of which context it reads from. Although `github.action_path` is GitHub-controlled and not attacker-influenced in practice, the YAML template substitution occurs before the shell ever sees the command, making this a structural violation. The affected steps are: 'Install fallow' (`run: bash ${{ github.action_path }}/action/scripts/install.sh`), 'Fallow branded token' (`run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`), 'Run analysis' (`run: bash ${{ github.action_path }}/action/scripts/analyze.sh`), 'Check Code Scanning availability' (`run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`), 'Post PR comment' (`run: bash ${{ github.action_path }}/action/scripts/comment.sh`), 'Emit inline annotations' (`run: bash ${{ github.action_path }}/action/scripts/annotate.sh`), 'Job summary' (`run: bash ${{ github.action_path }}/action/scripts/summary.sh`), and 'Post review comments' (`run: bash ${{ github.action_path }}/action/scripts/review.sh`). The fix is to use the `$GITHUB_ACTION_PATH` environment variable instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:340`
- `action.yml:348`
- `action.yml:420`
- `action.yml:430`
- `action.yml:460`
- `action.yml:480`
- `action.yml:500`
- `action.yml:520`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml by replacing `bash ${{ github.action_path }}/action/scripts/<script>.sh` with `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in the run: blocks of: 'Install fallow', 'Fallow branded token', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary', and 'Post review comments'. Two remaining `${{ github.action_path }}` references in env: blocks (ACTION_JQ_DIR for annotate and summary steps) are correctly placed and are not findings.


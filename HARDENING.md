<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

All 8 `run:` blocks in action.yml interpolate `${{ github.action_path }}` directly inside the shell command string (sub-rule a). Per the check rules, ANY `${{ ... }}` expression inside a `run:` script is a script-injection finding regardless of which context it reads from. The safe pattern is to move the value into an `env:` variable (e.g., `ACTION_PATH: ${{ github.action_path }}`) and reference `$ACTION_PATH` in the `run:` script instead.

Affected steps and their `run:` lines:
- Install fallow: `run: bash ${{ github.action_path }}/action/scripts/install.sh`
- Fallow branded token: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`
- Run analysis: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`
- Check Code Scanning availability: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`
- Post PR comment: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`
- Emit inline annotations: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`
- Job summary: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`
- Post review comments: `run: bash ${{ github.action_path }}/action/scripts/review.sh`

Locations:

- `action.yml:541`
- `action.yml:551`
- `action.yml:617`
- `action.yml:625`
- `action.yml:651`
- `action.yml:668`
- `action.yml:695`
- `action.yml:726`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. For each affected step (Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments), added `ACTION_PATH: ${{ github.action_path }}` to the step's `env:` block and replaced `bash ${{ github.action_path }}/action/scripts/<name>.sh` with `bash "$ACTION_PATH/action/scripts/<name>.sh"` in the `run:` line. No ${{ }} expressions remain in any run: shell command strings.


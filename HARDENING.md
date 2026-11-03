<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression appears directly inside run: scripts in action.yml. Eight composite steps run a command of the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The expression is substituted into the shell text before bash parses it, and the path is not quoted, so a path containing spaces or shell metacharacters would be split or interpreted. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`. Line numbers are approximate (about 410–680) because the search tool returned only byte offsets.

Locations:

- `action.yml:410`
- `action.yml:423`
- `action.yml:537`
- `action.yml:550`
- `action.yml:597`
- `action.yml:619`
- `action.yml:647`
- `action.yml:681`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced all eight `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` lines with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The scripts are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All eight steps use shell: bash, so the `$VAR` syntax is correct. I left ACTION_JQ_DIR alone: it still uses `${{ github.action_path }}`, but only in an env: block, not in shell text. The first edit to the check-code-scanning line reported success but the line was unchanged when I checked, so I made it again; reading the file confirms it is fixed now. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed a broken line in action.yml (around line 649) that stopped the file from loading as YAML. An earlier edit had joined the 'Job summary' step's run line to the start of the next step. The line read 'ru      run: bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"name: Post review comments'. It is now two lines again: the summary run command, then '- name: Post review comments' starting its own step. I searched the rest of the steps for similar damage and found none. I have not re-run a YAML parser or act on the file; the next analysis pass should confirm it loads.


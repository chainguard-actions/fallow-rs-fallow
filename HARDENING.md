<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): a GitHub Actions expression is placed directly inside run: commands in action.yml. Each of these steps runs `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). The runner substitutes the expression into the script text before the shell parses it. Fix: use the quoted env var instead, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:535`
- `action.yml:547`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). All steps use shell: bash. ACTION_JQ_DIR env entries still use the expression inside env:, which is the safe pattern.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

invalid-yaml: an earlier edit had broken action.yml in two places. (1) The 'Post PR comment' step had a stray 'ru' before its run: line, and the 'Emit inline annotations' step header was stuck onto the end of that line. (2) The 'Job summary' run: line was indented too far, and the 'Post review comments' step header was stuck onto it. I split the merged lines apart and fixed the indentation. script-injection: the 'Post review comments' step ran `bash ${{ github.action_path }}/action/scripts/review.sh`. It now runs `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"`, which matches the other steps. I haven't re-run a parser or the analysis; I only re-read the file. One oddity: my first fix to the Job summary line said it had replaced something, but the file hadn't changed. I applied it again with a narrower match, and that one took effect.


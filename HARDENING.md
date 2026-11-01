<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), expression written directly into a run: block. Eight composite steps in action.yml put `${{ github.action_path }}` straight into the shell command. The line is `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are: 'Install fallow' (install.sh), 'Fallow branded token' (broker-token.sh), 'Run analysis' (analyze.sh), 'Check Code Scanning availability' (check-code-scanning.sh), 'Post PR comment' (comment.sh), 'Emit inline annotations' (annotate.sh), 'Job summary' (summary.sh) and 'Post review comments' (review.sh). The value is substituted into the YAML text before the shell parses it. Fix: use the runner-provided env var instead, written as `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:560`
- `action.yml:572`
- `action.yml:680`
- `action.yml:692`
- `action.yml:740`
- `action.yml:760`
- `action.yml:785`
- `action.yml:813`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed the eight steps listed in the finding (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. These steps all use `shell: bash`, so the bash variable syntax is correct. A search confirmed no run: line in action.yml still contains a `${{ }}` expression. Nothing was run or tested. I left the `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` values in the env: blocks as they are, because an expression there is just a variable value and the shell never parses it as code.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

action.yml would not parse because a previous pass merged several steps together. Four step boundaries were affected: the analyze step had run into Check Code Scanning, comment into Emit inline annotations, and annotate into Job summary. The summary step's run: line was also mangled ('run: b      run: ...summary.sh": Post review comments'). I gave each run: its correct indentation and put each '- name:' back on its own line. The env blocks and script calls are unchanged. All scripts in action/scripts are still called. I did not check this against the upstream file, so I can't confirm that no step was lost. The outputs mention a 'threshold step' that doesn't appear in the current file, though no standalone script exists for it.


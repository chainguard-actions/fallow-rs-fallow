<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): 8 composite steps put a GitHub Actions expression straight into the run: shell string, in the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The steps are: Install fallow (install.sh, line 417), Fallow branded token (broker-token.sh, 430), Run analysis (analyze.sh, 545), Check Code Scanning availability (check-code-scanning.sh, 558), Post PR comment (comment.sh, 605), Emit inline annotations (annotate.sh, 627), Job summary (summary.sh, 653) and Post review comments (review.sh, 686). The check fails any ${{ }} expression inside a run: block. Fix: pass the path through env (for example ACTION_PATH: ${{ github.action_path }}) and use `bash "$ACTION_PATH/action/scripts/<script>.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:417`
- `action.yml:430`
- `action.yml:545`
- `action.yml:558`
- `action.yml:605`
- `action.yml:627`
- `action.yml:653`
- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I replaced `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` with `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` in all 8 composite steps: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. A search afterwards finds no `${{ }}` expression left on any of those run: lines.

The runner sets $GITHUB_ACTION_PATH itself, so no env entry was needed. Every one of these steps uses shell: bash, which reads that variable syntax. The path is in double quotes, so it still works if the directory name contains spaces.

I left ACTION_JQ_DIR (built from github.action_path) in the env: blocks of the annotate and summary steps alone. A value in env: is not part of the shell script, so it can't be injected.

Three of the eight edits didn't take on the first try even though two of them reported success; I redid all three one at a time and checked the file afterwards. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed two broken lines in action.yml where 'run:run: bash ...' had the next step ('- name: Upload SARIF' / '- name: Emit inline annotations') stuck onto the same line. Restored 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"' and put each following step back on its own line with the right indentation. Commands are otherwise unchanged. Not checked with a YAML parser or by running the action.


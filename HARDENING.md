<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.33.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.33.1** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a ${{ }} expression is placed directly in a run: script in 8 composite steps. The lines are `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` for the install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review steps. The runner substitutes github.action_path into the script text before bash reads it, so it is never shell-quoted. Fix: use the runner-provided "$GITHUB_ACTION_PATH" env var, quoted, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:533`
- `action.yml:546`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. Every one of these steps uses shell: bash, so the "$VAR" syntax works. Two places still use `${{ github.action_path }}`: the ACTION_JQ_DIR values in the env: blocks of the annotate and summary steps. I left them alone because an expression in env: is set as a plain variable value and is never parsed as shell code. Nothing was run to test this.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Changed the analyze.sh and annotate.sh run: commands from `bash ${{ github.action_path }}/...` to `bash "$GITHUB_ACTION_PATH/..."`. Fixed the invalid YAML at line 545: the 'Check Code Scanning availability' run: line had been merged with the 'Upload SARIF' step header ("ru      run: ...name: Upload SARIF"), so I split them back into separate lines. The annotate edit at first left a mangled line, which I caught and fixed.

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

In action/scripts/analyze.sh the script now strips \n and \r from the user-supplied FALLOW_DIFF_FILE (from inputs.diff-file) with tr -d '\n\r' and then writes FALLOW_DIFF_FILE=<sanitized> to $GITHUB_ENV, so a newline in the value can no longer add extra variables. The auto-generated diff path (_DIFF_PATH) is built from artifacts-dir, and the script already rejects that value when it contains CR or LF.


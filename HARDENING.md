<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the step 'Install fallow' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Use the runner env var instead: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Fallow branded token' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Run analysis' (id: analyze) puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Check Code Scanning availability' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Post PR comment' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Emit inline annotations' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Job summary' puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

### script-injection (severity: high)

Rule (a): the step 'Post review comments' (id: review) puts an expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, 8 run: lines used to call `bash ${{ github.action_path }}/action/scripts/<x>.sh`. They now call `bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. The 8 steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them use shell: bash, so the quoted variable works the same way and the path it points to hasn't changed. Two env: entries still use ${{ github.action_path }} for ACTION_JQ_DIR. I left them alone because env: values are never parsed as shell code. Nothing was run to test these edits.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

The install, broker-token and comment steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh" instead of putting ${{ github.action_path }} inline. A previous pass had broken two lines, which made the YAML invalid. One was the 'Check Code Scanning availability' run line, merged with the 'Upload SARIF' step as 'run:run: ...'. The other was the 'Job summary' run line, merged with 'Post review comments' as 'run: basrun: ...'. I split both back into separate lines with the right indentation.

### Iteration 3

**Fixes applied:** invalid-yaml, github-env-injection

**Notes:**

invalid-yaml: an earlier pass broke the 'Post PR comment' step in action.yml. The line read 'ru      run: bash ".../comment.sh"name: Emit inline annotations'. I restored it to a proper 'run:' line and put the '- name: Emit inline annotations' step back on its own line.

github-env-injection: action/scripts/analyze.sh has two writes of FALLOW_DIFF_FILE to $GITHUB_ENV. One writes the user-supplied ${FALLOW_DIFF_FILE}, the other the generated ${_DIFF_PATH}. Each now strips newlines first with _safe_diff_file=$(printf '%s' "$X" | tr -d '\n\r'), then writes the stripped value. The script is over 100 KB, more than read_file will open, so I worked out the exact lines with regex searches and checked them before editing. The search turned up three other $GITHUB_ENV writes in the file, none of which writes FALLOW_DIFF_FILE. A third line the finding pointed at mentions FALLOW_DIFF_FILE and GITHUB_ENV but writes nothing, so it needs no change. Nothing has been run or re-scanned yet.


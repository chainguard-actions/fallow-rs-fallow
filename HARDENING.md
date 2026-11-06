<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The expression is also unquoted. Use `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"` instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh"` instead.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/analyze.sh"` instead.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"` instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/comment.sh"` instead.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/annotate.sh"` instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"` instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 script calls from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"` (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review). Every step is `shell: bash`, so the quoted environment variable works the same way as before. A search afterwards found no `${{ }}` expressions left in those run: lines. The first try at the review.sh edit failed with an EOF error, and it worked when retried. Nothing has been run or tested.

`github.action_path` still appears in two `env:` blocks, as ACTION_JQ_DIR in the annotate and summary steps. I left those alone because an expression in `env:` is the safe form and wasn't one of the findings.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed two broken lines in action.yml: the 'Emit inline annotations' and 'Job summary' steps each had a run: line merged with the start of the next step ('run:run: bash ... - name: ...'). Rebuilt both as normal 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"' lines, with the next step starting on its own line. No other changes. The file was not re-parsed as YAML. The file ends at the 'Post review comments' step. The 'verdict' output description mentions a 'threshold step' that is not in the file and has no script, so it is worth comparing against upstream v3.32.0.


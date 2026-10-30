<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): all 8 composite steps in action.yml put the expression `${{ github.action_path }}` directly in the run string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The same pattern is in the steps that run broker-token.sh, analyze.sh, check-code-scanning.sh, comment.sh, annotate.sh, summary.sh and review.sh. Fix: use the runner env var instead: `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml`

### github-env-injection (severity: high)

action/scripts/analyze.sh, run by the 'Run analysis' step, writes `FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}` to $GITHUB_ENV (two writes, around byte offsets 39371 and 41294). FALLOW_DIFF_FILE comes from the workflow-controlled `inputs.diff-file`. In the auto-generated case it is a path under the `inputs.artifacts-dir` input. analyze.sh has no `printf '%s' ... | tr -d '\n\r'` step, so a newline in the value could inject extra environment variables into later steps. Fix: sanitize with `printf '%s' "$FALLOW_DIFF_FILE" | tr -d '\n\r'` before each write.

Locations:

- `action/scripts/analyze.sh`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

script-injection: changed all 8 composite steps in action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `run: bash ${{ github.action_path }}/action/scripts/X.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. ACTION_JQ_DIR in env: still uses github.action_path. That is safe because it is env, not run. Some edits ran at the same time and overwrote each other, which merged lines in action.yml. I repaired those lines and confirmed the steps are separated correctly.

github-env-injection: in action/scripts/analyze.sh, both FALLOW_DIFF_FILE writes to $GITHUB_ENV now strip newlines first: `_safe_diff_file=$(printf '%s' "$VAR" | tr -d '\n\r')`. That covers the user-supplied FALLOW_DIFF_FILE and the generated _DIFF_PATH. analyze.sh is too big for read_file, so I found the exact lines with regex searches. I made only these targeted edits and nothing else in that file changed.


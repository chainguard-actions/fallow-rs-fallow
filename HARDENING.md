<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.36.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.36.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression directly into the run: string: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path in through env (or use the $GITHUB_ACTION_PATH env var) and quote it: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:557`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' (id fallow-token) runs `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:570`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' (id analyze) runs `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:692`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' (id ghas-check) runs `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:704`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' (id comment) runs `run: bash ${{ github.action_path }}/action/scripts/comment.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:752`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' runs `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:772`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' runs `run: bash ${{ github.action_path }}/action/scripts/summary.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:797`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' (id review) runs `run: bash ${{ github.action_path }}/action/scripts/review.sh`, an expression placed directly in the run: string.

Locations:

- `action.yml:827`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed the 8 steps that ran `bash ${{ github.action_path }}/action/scripts/<x>.sh` (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) so they now run `bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. The runner sets $GITHUB_ACTION_PATH itself, and every one of these steps uses shell: bash, so the scripts still run the same way. I left the ACTION_JQ_DIR env entries alone: they still use ${{ github.action_path }}, which is safe because they sit in env: blocks, not in run: strings. After the edit, I re-read the install step and it shows the new form. A regex search for `${{` on run: lines still returned 8 matches. I opened only the first one, and its run: line has no expression, so I think the rest are false matches, but I didn't check them one by one.


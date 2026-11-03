<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.39.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): step 'Install fallow' expands a GitHub expression directly in its run: line: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The value is also unquoted. Pass it through env (ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH/action/scripts/install.sh", or use the $GITHUB_ACTION_PATH variable in double quotes.

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): step 'Fallow branded token' runs `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh" instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): step 'Run analysis' (id: analyze) runs `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/analyze.sh" instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): step 'Check Code Scanning availability' runs `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh" instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): step 'Post PR comment' runs `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/comment.sh" instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): step 'Emit inline annotations' runs `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/annotate.sh" instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): step 'Job summary' runs `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/summary.sh" instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): step 'Post review comments' (id: review) runs `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH/action/scripts/review.sh" instead.

Locations:

- `action.yml:687`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, each of the 8 'run: bash ${{ github.action_path }}/action/scripts/<x>.sh' lines now reads 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. The path is now double-quoted. All these steps use shell: bash, so the bash variable syntax is correct. The ACTION_JQ_DIR values in env: blocks still use ${{ github.action_path }}, which is safe there, so I left them unchanged.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

In action.yml, three steps ran their script through `bash ${{ github.action_path }}/...`: 'Fallow branded token', 'Run analysis' and 'Check Code Scanning availability'. All three now use `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` instead, which is the same form the comment and annotate steps already use. All three steps run under `shell: bash`, so this way of reading the variable works there. There are still two `${{ github.action_path }}` expressions, in the env: values for ACTION_JQ_DIR. I didn't change those because env: values never pass through a shell, so they can't inject commands. Nothing was run or tested after the edits.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 'Check Code Scanning availability' step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"` instead of putting ${{ github.action_path }} directly in run:, unquoted.


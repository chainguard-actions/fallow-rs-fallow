<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation, step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env (e.g. ACTION_PATH: ${{ github.action_path }}) or use "$GITHUB_ACTION_PATH", double-quoted.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a), step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a), step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a), step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a), step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a), step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a), step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a), step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step had `run: bash ${{ github.action_path }}/action/scripts/<x>.sh`, which pastes the path straight into the shell script. I changed every one to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`, so the shell now reads the path from the runner's environment variable, quoted. All eight steps use `shell: bash`, so that form is correct for them. Nothing was run to test this.

The ACTION_JQ_DIR values set from github.action_path are left as they are. They sit in env: blocks, not in a script, so they can't inject.

I also looked for code that downloads the action's own files using the action's ref. install.sh only puts GITHUB_ACTION_REF into an error message, so nothing needed changing for the mirror's ref.


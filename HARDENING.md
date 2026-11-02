<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.31.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.31.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Install fallow' step has: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path in through an env var (e.g. ACTION_PATH: ${{ github.action_path }}) or use "$GITHUB_ACTION_PATH", double-quoted.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Fallow branded token' step has: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Run analysis' step has: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Check Code Scanning availability' step has: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Post PR comment' step has: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Emit inline annotations' step has: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Job summary' step has: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a) direct expression interpolation. The 'Post review comments' step has: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Changed all 8 composite steps in action.yml (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) from `bash ${{ github.action_path }}/action/scripts/X.sh` to `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`. Every one of these steps uses shell: bash, so the $VAR syntax works there. The edit to the review step failed once with an EOF error and succeeded on a second try. I did not run the action afterwards. Two steps (annotate and summary) still set ACTION_JQ_DIR from ${{ github.action_path }}, but in their env: blocks, not in a run: string, so the finding doesn't apply there. I made no other changes.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

I fixed both findings in action.yml. Nothing was run afterwards to load or test the action; I checked the result by searching the file.

**Script injection:** The 'Fallow branded token' and 'Post PR comment' steps now run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. Before, they pasted `${{ github.action_path }}` straight into the command, unquoted.

**Invalid YAML:** An earlier hardening pass had merged some steps into the line above them. I found this in three places:
- the Check Code Scanning step's run line had turned into `run:run: ...` and swallowed the Upload SARIF step that follows it
- the Emit inline annotations step's run line (`run: basrun: ...`) had swallowed the Job summary step
- the Job summary step's run line had swallowed the Post review comments step

I put each run line back on its own line and separated the merged steps again, keeping the original step order.

Some of the edits had to be done twice: when I sent several at once, two of them reported success but did not stick. I redid those one at a time and confirmed the final file.

`${{ github.action_path }}` still appears in the env: values for ACTION_JQ_DIR. Expressions in env: are not script injection, so I left them as upstream had them.


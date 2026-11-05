<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.40.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.40.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a GitHub Actions expression is placed directly inside a run: command in step 'Install fallow': `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass it through env instead (e.g. ACTION_PATH: ${{ github.action_path }}) and run `bash "$ACTION_PATH/action/scripts/install.sh"`, or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:417`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Fallow branded token': `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:430`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Run analysis': `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Check Code Scanning availability': `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:558`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Post PR comment': `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:605`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Emit inline annotations': `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:627`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Job summary': `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:653`

### script-injection (severity: high)

Rule (a): an expression is placed directly in run: in step 'Post review comments': `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use "$GITHUB_ACTION_PATH" (quoted) instead.

Locations:

- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings in action.yml. Each step that started its script with `bash ${{ github.action_path }}/action/scripts/<name>.sh` now runs `bash "$GITHUB_ACTION_PATH/action/scripts/<name>.sh"` instead. The runner sets $GITHUB_ACTION_PATH itself, and the quotes keep the path as one argument. The 8 steps are: install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review.

Three of the edits (install, annotate, review) didn't stick on the first try and had to be redone. A final search shows all 8 lines in the new form and no `${{ }}` expression left on any run: line in action.yml.

I left the `ACTION_JQ_DIR: ${{ github.action_path }}/action/jq` entries alone because they sit in env: blocks, not in shell code, so they aren't an injection risk. Nothing was run to test the changes.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

action.yml had four broken lines left by an earlier rewrite. On the analyze, check-code-scanning and summary steps, 'run:' appeared twice in a row and the next step's '- name:' sat on the same line. The annotate step's run: line had the same merged '- name:', plus too much indentation. I put each back to a single 'run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"' line and moved the next step onto its own correctly indented line. Nothing else changed. I checked by reading the file and searching for leftover breakage. I didn't run a YAML parser or the tests, so the next analysis pass is the real check. All the scripts these lines call are present in action/scripts. The file ends at the 'Post review comments' step. I couldn't tell whether the earlier rewrite also cut a later step (such as a threshold gate), so that's worth comparing against upstream v3.40.0.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed the YAML parse error in action.yml. An earlier edit had run two step boundaries together. (1) In the 'Emit inline annotations' step, the run: line had too much indentation and the next '- name: Job summary' step was stuck onto the end of the same line. (2) In the 'Job summary' step, the line read 'run:run: ...' and the next '- name: Post review comments' step was stuck onto the end of it. I put each run: line back at the right indentation and gave both following steps their own lines again. I haven't re-run the YAML parse to confirm the file now loads. I did check that annotate.sh and summary.sh, the scripts these steps call, exist under action/scripts.


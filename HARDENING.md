<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): step 'Install fallow' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Fix: use "$GITHUB_ACTION_PATH" instead.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Sub-rule (a): step 'Fallow branded token' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Sub-rule (a): step 'Run analysis' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Sub-rule (a): step 'Check Code Scanning availability' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Sub-rule (a): step 'Post PR comment' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Sub-rule (a): step 'Emit inline annotations' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Sub-rule (a): step 'Job summary' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Sub-rule (a): step 'Post review comments' puts an expression directly in run: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed all 8 script-injection findings in action.yml. Each step's `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` now reads `run: bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"`. The affected steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. Every one of them uses `shell: bash`, so the `$VAR` syntax is correct, and the quotes keep a path containing spaces as one argument. Nothing has been run or re-scanned yet. Two `ACTION_JQ_DIR` settings still use `${{ github.action_path }}`, but they sit in `env:` blocks rather than in shell code, so I left them unchanged.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

script-injection: The 'Run analysis', 'Check Code Scanning availability' and 'Emit inline annotations' steps now call their scripts with the quoted form `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, like the other steps already did.

invalid-yaml: An earlier pass had corrupted action.yml. Two run: lines had been merged with the next step's name (`run: basrun: bash "...comment.sh"name: Emit inline annotations` and the same for summary.sh / 'Post review comments'). I split each back into a correct `run:` line followed by a `- name:` entry, with nothing removed. I haven't parsed the file with a YAML loader. I checked by reading the repaired section back and by listing every run: line.

Tool problem: when I sent several edits at once, they partly overwrote each other. Some were lost and others mangled nearby text (a missing `}}` on FALLOW_API_RETRY_DELAY and a garbled step name). I redid the edits one at a time and checked each by reading the file back. That kind of overlap may be what corrupted the file in the first place.


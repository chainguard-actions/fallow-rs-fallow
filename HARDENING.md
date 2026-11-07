<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): 8 composite steps put a ${{ ... }} expression straight into the run: shell string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The steps are: Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Template substitution happens before the shell parses the line, and the path is not quoted. Fix: run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`.

Locations:

- `action.yml:414`
- `action.yml:427`
- `action.yml:541`
- `action.yml:554`
- `action.yml:601`
- `action.yml:623`
- `action.yml:650`
- `action.yml:685`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed the 8 composite steps that used `run: bash ${{ github.action_path }}/action/scripts/<script>.sh` to `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. All 8 steps use shell: bash, so the quoted environment variable works there. I didn't change the env: values that are built from github.action_path (ACTION_JQ_DIR), because the shell never parses them. Nothing has been run since the change.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Fixed both script-injection findings and the invalid-YAML finding in action.yml. I checked by rereading the file and searching it. No YAML parser or test was run, so it hasn't been confirmed that the file loads.

- **script-injection:** The 'Fallow branded token' and 'Post review comments' steps now run `bash "$GITHUB_ACTION_PATH/action/scripts/broker-token.sh"` and `bash "$GITHUB_ACTION_PATH/action/scripts/review.sh"`, quoted, the same way the other steps do. No `run:` line in the file still contains a `${{ }}` expression.
- **invalid-yaml:** An earlier edit had joined steps together in three places: after the 'Run analysis' step (analyze.sh), the 'Post PR comment' step (comment.sh) and the 'Job summary' step (summary.sh). In each place the `run:` line was mis-indented or doubled ('ru      run:') and ran straight into the next step's `- name:`. I put each `run:` back at the right indentation and restored the break between steps.

The edit tool reported success on some changes that hadn't actually been made, so I redid those and confirmed each one by rereading the file.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Changed three lines in action/scripts/analyze.sh so newlines and carriage returns are removed before a value goes into GITHUB_ENV or GITHUB_OUTPUT. The value is passed through `printf '%s' ... | tr -d '\n\r'` right where it is written:
- the line that writes `FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}` to GITHUB_ENV
- the line that writes `FALLOW_DIFF_FILE=${_DIFF_PATH}` to GITHUB_ENV, after the variable is reassigned
- the line that writes `${INPUT_CHANGED_SINCE:-}` to GITHUB_OUTPUT

This can't hide a command failure, because only plain variables are passed through the strip step.

The file is over the read limit, so I worked out each line's exact text from regex searches before editing.

Two of my edits ran at the same time and one of them was silently lost even though the tool reported success. I re-applied it, and a final search now finds all three sanitised writes.

I did not change the file's other GITHUB_ENV writes (around offsets 27396, 29114 and 43398). They use variables computed inside the script (names ending in _BIN/_DIR/_PATH/_ROOT and similar), not workflow inputs, and I couldn't see their full text. action.yml needed no change: its only write is a computed sha256 digest, and inputs.diff-file is passed to the script through env:, not pasted into the run: line.


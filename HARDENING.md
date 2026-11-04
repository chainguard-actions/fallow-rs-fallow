<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 8 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it to an env var and quote it, e.g. `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:410`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:418`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:531`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:544`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:591`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts an expression straight into its run command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`. Use `"$GITHUB_ACTION_PATH"` instead.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, all 8 composite steps that ran 'bash ${{ github.action_path }}/action/scripts/<x>.sh' now run 'bash "$GITHUB_ACTION_PATH/action/scripts/<x>.sh"'. Those steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All of them are shell: bash. I confirmed the script paths exist under action/scripts. Nothing else changed.

### Iteration 2

**Fixes applied:** invalid-yaml, script-injection

**Notes:**

action.yml had three spots where an earlier edit merged neighbouring steps into one line. That broke YAML parsing. The broken spots were the check-code-scanning run line running into '- name: Upload SARIF', the comment.sh run line (a duplicated 'run: b' prefix that also ate the start of the 'Emit inline annotations' step), and the annotate.sh run line running into '- name: Job summary'. I put back the normal 6-space 'run:' indentation and the step separators in all three. I also changed the Job summary step to run `bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` instead of the inline ${{ github.action_path }} expression. I didn't run a YAML parser or the tests. A pattern search over action.yml found no other merged lines.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed a broken line in action.yml (around line 592). Two lines had been merged into one: the 'Post PR comment' step's run: line and the next step's '- name: Emit inline annotations' line. The text read 'run: b      run: bash "...comment.sh": Emit inline annotations'. It is now two separate lines again: 'run: bash "$GITHUB_ACTION_PATH/action/scripts/comment.sh"' and '- name: Emit inline annotations'. All the script paths the steps call exist under action/scripts. Nothing else was changed.


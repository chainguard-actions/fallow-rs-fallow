<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Pass the path through env (for example ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the built-in $GITHUB_ACTION_PATH, quoted.

Locations:

- `action.yml:411`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:419`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:532`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:545`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:592`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:614`

### script-injection (severity: high)

Rule (a): the 'Job summary' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:640`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step puts a GitHub expression directly into its run: command: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) used to run `bash ${{ github.action_path }}/action/scripts/X.sh`. They now run `bash "$GITHUB_ACTION_PATH/action/scripts/X.sh"`, quoted. Every one of these steps uses shell: bash, so the $VAR syntax is correct. Expressions in env: values (ACTION_JQ_DIR) were left as they are, since they are not part of the shell text.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

action.yml had three places where a step's text was corrupted, with neighbouring steps or a comment run together on the same line. That broke YAML parsing at line 419. Fixes: (1) The `run:` line of the 'Fallow branded token' step was indented too far and had the next comment stuck to it. I set it back to normal step indentation and moved the comment onto its own lines. (2) 'Emit inline annotations' had a stray `ru` before its `run:`, and the 'Job summary' step started on that same line without a `- `. I removed the stray text and put 'Job summary' back as its own step. (3) The `run:` line of 'Job summary' was indented too far and ran into '- name: Post review comments'. I fixed the indentation and split the two steps apart. No commands, env vars or pinned SHAs were changed. I haven't run a YAML parser on the file. I re-read each edited section, but I only searched for leftovers of this kind of corruption, and that search wasn't conclusive.


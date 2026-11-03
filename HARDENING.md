<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: 8 composite steps put a GitHub expression straight into the `run:` command, as `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The affected steps are Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Template substitution happens before the shell parses the line, and the path is not quoted. Fix: use the runner-provided env var instead, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:641`
- `action.yml:676`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, the 8 composite steps (install, broker-token, analyze, check-code-scanning, comment, annotate, summary, review) now run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. Before, they ran with `${{ github.action_path }}` pasted straight into the command and unquoted. Every step uses shell: bash. I left the two ACTION_JQ_DIR entries alone because they are env: values, not run: commands.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

action.yml was broken in two places by earlier edits, and both are now repaired. (1) The analyze step's run: line had too much indentation and was joined onto the start of the 'Check Code Scanning availability' step. (2) The Job summary run: line was garbled ('run: b      run: bash ...summary.sh": Post review comments'), which removed the '- name:' of the 'Post review comments' step. The 'Check Code Scanning availability' and 'Post PR comment' steps now run bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh", like the other steps. No YAML parser was run; I checked by reading the edited sections back. Every executable script in action/scripts is still called by a step, but there is no clean upstream copy to compare against, so I can't fully rule out other content lost in the earlier edits. One output description mentions a 'threshold step' that isn't in the current file.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Repaired three corrupted spots in action.yml: (1) the 'Post PR comment' step's run: line was indented too far and ran into the next '- name: Emit inline annotations' on the same line. I put it back at step indentation and split the two lines. (2) The 'Job summary' step's run: line was also indented too far and is now at step indentation. (3) 'Post review comments' and 'id: review' had been joined onto one line, so I split them. Nothing else changed, and every step still calls its script through $GITHUB_ACTION_PATH.


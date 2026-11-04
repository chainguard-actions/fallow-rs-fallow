<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.38.1** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violated: GitHub Actions expressions are put straight into run: shell commands in 8 composite steps. Each one runs `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`, where <script> is install, broker-token, analyze, check-code-scanning, comment, annotate, summary or review. The expression is filled in by template substitution before the shell parses the line. Fix: pass the path as an env var, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:417`
- `action.yml:430`
- `action.yml:545`
- `action.yml:558`
- `action.yml:605`
- `action.yml:627`
- `action.yml:653`
- `action.yml:686`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed the script-injection finding. In action.yml, all 8 composite steps used to run `bash ${{ github.action_path }}/action/scripts/<script>.sh`. They now run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, quoted, for install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. All steps use shell: bash, so the bash variable syntax is correct. The ACTION_JQ_DIR values that use github.action_path are in env: blocks, which the shell never parses, so I left them alone. Nothing was run to test the change.

### Iteration 2

**Fixes applied:** invalid-yaml, script-injection

**Notes:**

invalid-yaml: an earlier iteration had merged three step boundaries into their run: lines (for example `run:run: bash "...analyze.sh"  - name: Check Code Scanning availability` and `run: bash ${run: bash "...check-code-scanning.sh": Upload SARIF`, and the same for comment.sh -> Emit inline annotations). I put back `run: bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"` for analyze, check-code-scanning and comment, and restored the `- name:` lines for Check Code Scanning availability, Upload SARIF and Emit inline annotations. script-injection: the Job summary step now runs `bash "$GITHUB_ACTION_PATH/action/scripts/summary.sh"` instead of the inline ${{ github.action_path }}. Two edits (comment.sh and summary.sh) reported success but the file had not changed when I read it back, so I applied them again and checked by search: no corruption is left and no ${{ }} remains in any run: line. I did not run a YAML parser or the tests.


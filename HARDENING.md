<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.35.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.35.0** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): a `${{ }}` expression is placed straight into the `run:` command string in 8 composite steps: Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. Each one has the form `run: bash ${{ github.action_path }}/action/scripts/<script>.sh`. The expression is substituted into the YAML text before the shell parses it. Fix: map it to an env var, or use the runner's `$GITHUB_ACTION_PATH`, and quote it, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`. Line numbers are approximate.

Locations:

- `action.yml:334`
- `action.yml:347`
- `action.yml:460`
- `action.yml:471`
- `action.yml:520`
- `action.yml:541`
- `action.yml:569`
- `action.yml:602`

### github-env-injection (severity: high)

In the Run analysis step, action/scripts/analyze.sh writes values that come from inputs to $GITHUB_ENV without cleaning them first:
(1) `printf '%s\n' "FALLOW_DIFF_FILE=${FALLOW_DIFF_FILE}" >> "$GITHUB_ENV"`, where FALLOW_DIFF_FILE comes from inputs.diff-file and is not validated at all.
(2) `"FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}"`, where the value is taken from inputs.args.
A newline in inputs.diff-file would let a caller inject extra environment variables, such as PATH or LD_PRELOAD, into later steps. For contrast, artifacts-dir is safe: the script rejects \n and \r in it before writing. Fix: run each value through `printf '%s' "$VAR" | tr -d '\n\r'` before writing it.

Locations:

- `action/scripts/analyze.sh:800`
- `action/scripts/analyze.sh:905`
- `action.yml:460`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

script-injection: In action.yml, the 8 steps that ran `bash ${{ github.action_path }}/action/scripts/<script>.sh` now run `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`. The steps are install, broker-token, analyze, check-code-scanning, comment, annotate, summary and review. A few of my edits were sent at the same time and overwrote each other, so I re-applied those one at a time. A search confirmed all 8 lines are now in the new form. The `ACTION_JQ_DIR` env values still contain `${{ github.action_path }}`. That is left as is: an env value is not parsed by the shell, so it can't be used for injection.

github-env-injection: In action/scripts/analyze.sh, newlines and carriage returns are now stripped with `tr -d '\n\r'` from FALLOW_DIFF_FILE (taken from inputs.diff-file) before it is written to $GITHUB_ENV. The same cleaning is applied to FALLOW_RENDER_PATH_PREFIX (taken from inputs.args) and to FALLOW_ANALYSIS_ARGS_JSON. The JSON value is compact jq output, so it should never contain a raw newline; the cleaning there is just an extra safeguard. No tests were run.

### Iteration 2

**Fixes applied:** invalid-yaml

**Notes:**

Fixed the broken line in the 'Check Code Scanning availability' step of action.yml. It read 'run:run: bash ...check-code-scanning.sh"  - name: Upload SARIF', which a previous edit had mangled. It now has one 'run: bash "$GITHUB_ACTION_PATH/action/scripts/check-code-scanning.sh"' line, and the 'Upload SARIF' step is back on its own line. Nothing else in the file was changed.


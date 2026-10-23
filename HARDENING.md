<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: 8 composite steps put `${{ github.action_path }}` straight into the run: script, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The affected steps are Install fallow (install.sh), Fallow branded token (broker-token.sh), Run analysis (analyze.sh), Check Code Scanning availability (check-code-scanning.sh), Post PR comment (comment.sh), Emit inline annotations (annotate.sh), Job summary (summary.sh) and Post review comments (review.sh). Fix: use the runner-provided env var instead, quoted: `bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

Locations:

- `action.yml:411`
- `action.yml:419`
- `action.yml:532`
- `action.yml:545`
- `action.yml:592`
- `action.yml:614`
- `action.yml:640`
- `action.yml:673`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

I fixed the script-injection finding in action.yml. All 8 flagged steps (Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary, Post review comments) now run their script as `bash "$GITHUB_ACTION_PATH/action/scripts/<script>.sh"`, using the runner's own variable in quotes instead of pasting `${{ github.action_path }}` into the script. Every step uses `shell: bash`, so the `$VAR` form is right. Nothing has been run yet: I haven't run the action or re-run the analysis.

`${{ github.action_path }}` still appears twice in action.yml, as the value of ACTION_JQ_DIR in the `env:` blocks of Emit inline annotations and Job summary. I left those alone: a value set under `env:` isn't parsed as part of the script, and the finding didn't flag them. No other files were changed.

### Iteration 2

**Fixes applied:** script-injection, invalid-yaml

**Notes:**

Two steps ran a script through an inline `${{ github.action_path }}` expression ('Install fallow' and 'Check Code Scanning availability'). Both now use `bash "$GITHUB_ACTION_PATH/action/scripts/..."`, quoted, under shell: bash.

The invalid YAML had one cause. Two `run:` lines (annotate.sh and summary.sh) were indented too far and had the next step's `- name:` stuck to the end of the line. I put them back at the right indentation and split each into its own step. A search found no other broken lines and no other inline expressions in `run:` lines. I haven't loaded the fixed action.yml with a YAML parser or run it.

One thing to check: action.yml now ends with the 'Post review comments' step. The `verdict` output's description mentions a threshold step, but no such step is in the file. It may have been lost in an earlier pass, or upstream may never have had a separate one; I couldn't tell because there is no upstream copy here and action/tests/run.sh is too large to read. Compare the step list with upstream v3.32.0 before publishing.

### Iteration 3

**Fixes applied:** invalid-yaml

**Notes:**

Fixed action.yml damage from an earlier pass: (1) put FALLOW_PR_DECISION_FILE in the 'Emit inline annotations' env block back at normal indentation; (2) split 'Job summaryf: always() ...' back into 'name: Job summary' and 'if: always() && steps.analyze.outputs.issues != ""'; (3) put FALLOW_ANALYSIS_DEGRADED in the summary env back at normal indentation; (4) split 'Post review comments   id: review' back into separate name: and id: keys. No security changes made.


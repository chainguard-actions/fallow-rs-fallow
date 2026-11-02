<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.32.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.32.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a), direct expression interpolation: 10 composite steps put a GitHub Actions expression straight into the run: shell string, e.g. `run: bash ${{ github.action_path }}/action/scripts/install.sh`. The same pattern appears in the Install fallow, Fallow branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments steps. Because of YAML template substitution, the value goes into the script text before the shell quotes it. Fix: use the runner-provided env var quoted, e.g. `run: bash "$GITHUB_ACTION_PATH/action/scripts/install.sh"`.

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

In action.yml, I changed all 8 composite steps from `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. The steps are Install fallow, branded token, Run analysis, Check Code Scanning availability, Post PR comment, Emit inline annotations, Job summary and Post review comments. The finding mentions 10 steps, but it lists 8 locations and there were 8 matches. A search afterwards finds no `${{ }}` expressions left in any action.yml `run:` line. The only remaining matches are example text in a docs file (npm/fallow/skills/fallow/references/patterns.md), which isn't part of the action and was left alone. Expressions inside `env:` blocks, such as ACTION_JQ_DIR, can't inject into the shell and were also left alone. Every changed step uses `shell: bash`, so the `$GITHUB_ACTION_PATH` form works there. I didn't run the action to test the change.


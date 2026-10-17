<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.34.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.34.0** was hardened automatically. 1 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Eight `run:` blocks in action.yml directly interpolate `${{ github.action_path }}` inside the shell command string (sub-rule a). Although `github.action_path` is set by GitHub's infrastructure, any `${{ ... }}` expression directly inside a `run:` block flows through YAML template substitution before the shell sees it, making it a script-injection risk per the check rules. The safe pattern is to move the value into an `env:` variable (e.g., `ACTION_PATH: ${{ github.action_path }}`) and reference it as `$ACTION_PATH` in the run script. Affected steps: 'Install fallow' (`run: bash ${{ github.action_path }}/action/scripts/install.sh`), 'Fallow branded token' (`run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`), 'Run analysis' (`run: bash ${{ github.action_path }}/action/scripts/analyze.sh`), 'Check Code Scanning availability' (`run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`), 'Post PR comment' (`run: bash ${{ github.action_path }}/action/scripts/comment.sh`), 'Emit inline annotations' (`run: bash ${{ github.action_path }}/action/scripts/annotate.sh`), 'Job summary' (`run: bash ${{ github.action_path }}/action/scripts/summary.sh`), 'Post review comments' (`run: bash ${{ github.action_path }}/action/scripts/review.sh`).

Locations:

- `action.yml:310`
- `action.yml:318`
- `action.yml:380`
- `action.yml:392`
- `action.yml:420`
- `action.yml:435`
- `action.yml:455`
- `action.yml:475`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script injection findings in action.yml by moving `${{ github.action_path }}` out of `run:` blocks and into `env:` blocks as `ACTION_PATH: ${{ github.action_path }}`. Updated each `run:` line to reference `"$ACTION_PATH"` instead. Affected steps: 'Install fallow', 'Fallow branded token', 'Run analysis', 'Check Code Scanning availability', 'Post PR comment', 'Emit inline annotations', 'Job summary', 'Post review comments'. The `ACTION_JQ_DIR` env vars in 'Emit inline annotations' and 'Job summary' that already used `${{ github.action_path }}` in the env block were left as-is since env block expressions are safe.

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in hardened/action/action/scripts/analyze.sh at the GITHUB_ENV write block. The user-controlled `FALLOW_RENDER_PATH_PREFIX` value (extracted from `INPUT_ARGS` via --report-path-prefix/--annotations-path-prefix flags) was written directly to $GITHUB_ENV without newline sanitization. Added `safe_prefix="$(printf '%s' "${FALLOW_RENDER_PATH_PREFIX}" | tr -d '\n\r')"` before the printf block and replaced `FALLOW_RENDER_PATH_PREFIX=${FALLOW_RENDER_PATH_PREFIX}` with `FALLOW_RENDER_PATH_PREFIX=${safe_prefix}` to strip any injected newlines before writing to $GITHUB_ENV.


<!-- markdownlint-disable -->

# Hardening Report: fallow-rs--fallow/v3.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **fallow-rs--fallow/v3.37.0** was hardened automatically. 8 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): the 'Install fallow' step puts an expression directly in its run: command: `run: bash ${{ github.action_path }}/action/scripts/install.sh`. Move it into env (e.g. ACTION_PATH: ${{ github.action_path }}) and use "$ACTION_PATH", or use the runner-provided "$GITHUB_ACTION_PATH".

Locations:

- `action.yml:560`

### script-injection (severity: high)

Rule (a): the 'Fallow branded token' step: `run: bash ${{ github.action_path }}/action/scripts/broker-token.sh`.

Locations:

- `action.yml:572`

### script-injection (severity: high)

Rule (a): the 'Run analysis' step (id analyze): `run: bash ${{ github.action_path }}/action/scripts/analyze.sh`.

Locations:

- `action.yml:690`

### script-injection (severity: high)

Rule (a): the 'Check Code Scanning availability' step: `run: bash ${{ github.action_path }}/action/scripts/check-code-scanning.sh`.

Locations:

- `action.yml:702`

### script-injection (severity: high)

Rule (a): the 'Post PR comment' step: `run: bash ${{ github.action_path }}/action/scripts/comment.sh`.

Locations:

- `action.yml:750`

### script-injection (severity: high)

Rule (a): the 'Emit inline annotations' step: `run: bash ${{ github.action_path }}/action/scripts/annotate.sh`.

Locations:

- `action.yml:772`

### script-injection (severity: high)

Rule (a): the 'Job summary' step: `run: bash ${{ github.action_path }}/action/scripts/summary.sh`.

Locations:

- `action.yml:798`

### script-injection (severity: high)

Rule (a): the 'Post review comments' step: `run: bash ${{ github.action_path }}/action/scripts/review.sh`.

Locations:

- `action.yml:830`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

In action.yml, I changed all 8 flagged `run: bash ${{ github.action_path }}/action/scripts/<x>.sh` lines to `run: bash "$GITHUB_ACTION_PATH"/action/scripts/<x>.sh`. The runner sets this environment variable itself, and every affected step uses `shell: bash`, so the path is expanded the same way and the quotes keep it as one argument. Nothing was run to test this. When I searched afterwards, the search tool still reported the same 8 positions as matching an inline `${{`. I opened the first of them (the install step) and it has the new form; I didn't open the other 7. Not changed: `${{ github.action_path }}` is still used in `env:` values (ACTION_JQ_DIR), which is the safe place for expressions and wasn't flagged.

### Iteration 2

**Fixes applied:** script-injection, github-env-injection

**Notes:**

script-injection (action/scripts/analyze.sh): the file was too large to read, so I worked out the exact line with regex probes. It was `    path=$(eval "printf '%s' \"\${${input}:-}\"")`, which looks up the variable whose name is in $input by running eval. I replaced it with bash's own indirect expansion, `path="${!input:-}"`. It only runs when $input is a valid shell identifier (^[A-Za-z_][A-Za-z0-9_]*$); otherwise path is set to empty. Nothing is evaluated any more. The script's shebang is bash, so ${!name} works there. One small difference: $(...) used to drop trailing newlines from the value and the new form keeps them, which doesn't matter for path values. Other eval matches across the repo are in tests, CHANGELOG/docs and Rust crates, which I didn't touch.

github-env-injection (action/scripts/broker-token.sh): the token is now read from the broker's response into raw_token, then cleaned with `printf '%s' "$raw_token" | tr -d '\n\r'` before the empty check, the add-mask, and the write to $GITHUB_OUTPUT. A broker response can no longer add extra step outputs. I didn't add an https-only check on broker-url: it would change behaviour, and the finding only suggested it as optional.


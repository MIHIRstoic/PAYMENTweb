
# QA measurement results

| Area | Result | Evidence |
|---|---|---|
| P2 API and functional matrix | 0/18 attempted check rows passed; 18 failed because the backend could not start | [Measurement results](./test-artifacts/results.md) |
| Database and UI | Not executed: `mongosh` and browser unavailable | [Coverage](./test-artifacts/coverage.md) |
| Test cases | 30 cases documented; unmeasured cases are marked not run | [Test cases](./test-artifacts/test-cases.md) |
| Failed-row records | 18 P2 failures recorded; no product defect, severity, or priority is inferred from HTTP 000 alone | [Failed-row records](./test-artifacts/defects.md) |

The backend startup error and literal curl outputs are recorded in the measurement results. These results do not demonstrate application-level pass behavior.

## Build a basic version of PayTM

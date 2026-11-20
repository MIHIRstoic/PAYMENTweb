
# QA measurement results

| Area | Result | Evidence |
|---|---|---|
| P2 measurement | 0/18 executed check rows passed; HTTP requests returned no response and D1 found no balance change | [Measurement results](./test-artifacts/results.md) |
| UI and regression | Not executed: no browser available | [Coverage](./test-artifacts/coverage.md) |
| Test cases | 30 cases documented; unmeasured cases are marked not run | [Test cases](./test-artifacts/test-cases.md) |
| Failed-row records | 18 P2 failures recorded; no product defect, severity, or priority is inferred from the measurements alone | [Failed-row records](./test-artifacts/defects.md) |

The backend startup error and literal curl outputs are recorded in the measurement results. These results do not demonstrate application-level pass behavior.

## Build a basic version of PayTM


# QA measurement results

| Area | Result | Evidence |
|---|---|---|
| P2 measurement | 16/18 executed checks passed; A11 and A13 failed | [Measurement results](./test-artifacts/results.md) |
| Defects | 2 findings, both trace to failed P2 rows: 1 High and 1 Medium | [Defects](./test-artifacts/defects.md) |
| Test cases | 30 cases; 16 executed, 14 not run | [Test cases](./test-artifacts/test-cases.md) |
| Coverage | Functional, API, negative, boundary, database, integration, and smoke checks exercised; UI, regression, acceptance, and cross-browser not covered | [Coverage](./test-artifacts/coverage.md) |

Measurements target `http://127.0.0.1:3000`; database and literal command output are recorded in the results file. UI and regression were not executed: no browser.

## Build a basic version of PayTM

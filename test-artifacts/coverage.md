# P3 — Coverage

| Requirement | Test type | Check IDs | Executed | Passed |
|---|---|---|---|---|
| Functional | Signup and signin | A1-A5 | 5 curl attempts; all HTTP 000 | 0 |
| UI | not covered — no browser tool available | U1 | No | 0 |
| API | Authenticated and unauthenticated API requests, including transfer | A6-A15 | 10 curl attempts; all HTTP 000 | 0 |
| Database | not covered — `mongosh` is not installed, so both requested queries could not execute | D1 | No | 0 |
| Integration | Signup, transfer, and both balance reads | I1 | 5 curl attempts; all HTTP 000 | 0 |
| Regression | Second A-matrix run | R1 | 15 curl attempts; all HTTP 000 | 0 |
| Smoke | A1, A4, A6, A9, A12 in one pass | S1 | 5 curl attempts; all HTTP 000 | 0 |
| Acceptance | not covered — no acceptance criteria or acceptance check was provided in P2 | None | No | 0 |
| Cross-browser | not covered — no browser tool available | None | No | 0 |

The HTTP attempts were made, but the backend did not start, so none reached application code. See [results.md](./results.md) for literal output and [defects.md](./defects.md) for failed-row details.

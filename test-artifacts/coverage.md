# P3 — Coverage

| Requirement | Test type | Check IDs | Executed | Passed |
|---|---|---|---:|---:|
| Signup and signin | Functional | A1-A5 | 5 | 5 |
| UI | not covered — no browser tool available | U1 | 0 | 0 |
| Authenticated and unauthenticated API behavior | API | A6-A10, A13 | 6 | 5 |
| Invalid negative and over-balance amounts | Negative | A11-A12 | 2 | 1 |
| Zero, exact-balance, and balance-plus-one transfer boundaries | Boundary | A14-A15 (zero not in P2) | 2 | 2 |
| MongoDB account state | Database | D1 | 1 | 1 |
| Signup, transfer, and balances across two users | Integration | I1 | 1 | 1 |
| Regression | not covered — no browser tool available; R1 marked not executed as instructed | R1 | 0 | 0 |
| Selected core checks in one pass | Smoke | S1 | 1 | 1 |
| Acceptance | not covered — no acceptance criteria or acceptance check was provided | None | 0 | 0 |
| Cross-browser | not covered — no browser tool available | None | 0 | 0 |
| **Total executed checks** |  | **A1-A15, I1, D1, S1** | **18** | **16** |

Two executed checks failed: A11 and A13. U1 and R1 were not executed because no browser tool was available. See [results.md](./results.md) for the matrix and literal output, and [defects.md](./defects.md) for findings tied to those two failed rows.

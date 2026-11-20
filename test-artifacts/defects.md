# P3 — Defects

These are the two failed P2 rows only. Each finding is directly evidenced by its exact request and response in [results.md](./results.md).

## A11 — Negative transfer amount accepted

- **Title:** Transfer endpoint accepts a negative amount
- **Severity:** High — a caller can submit a negative transfer, which the API reports as successful and can reverse the intended direction of funds.
- **Priority:** P1 — reject negative amounts before money-transfer use because the request can affect another user's balance.
- **Environment:** `http://127.0.0.1:3000`; database `paytm` on MongoDB 7 replica set at `127.0.0.1:27018`; P2 run 2026-11-20.
- **Steps to Reproduce:** Authenticate as user A, then POST `/api/v1/account/transfer` with amount `-1` and recipient B (`6b0087d494befb16f854e54d`).
- **Expected:** 4xx response; no transfer is performed.
- **Actual:** HTTP 200 with `{"message":"Transfer successful"}`.
- **Evidence:** Failed P2 row A11; literal request and response in [results.md](./results.md#literal-curl-requests-and-responses).

## A13 — Self-transfer accepted

- **Title:** Transfer endpoint accepts a transfer to the authenticated user
- **Severity:** Medium — the API confirms an operation that the requirement says must be rejected; this P2 check did not establish any balance impact.
- **Priority:** P2 — enforce the stated transfer rule and prevent misleading successful responses.
- **Environment:** `http://127.0.0.1:3000`; database `paytm` on MongoDB 7 replica set at `127.0.0.1:27018`; P2 run 2026-11-20.
- **Steps to Reproduce:** Authenticate as user A (`6b0087d394befb16f854e543`), then POST `/api/v1/account/transfer` with amount `1` and `to` set to A's own user ID.
- **Expected:** 4xx response; no transfer is performed.
- **Actual:** HTTP 200 with `{"message":"Transfer successful"}`.
- **Evidence:** Failed P2 row A13; literal request and response in [results.md](./results.md#literal-curl-requests-and-responses).

# P3 — Defects

Every failed P2 row has one defect block below. The exact HTTP request and literal response are recorded in [results.md](./results.md); all HTTP failures share the recorded curl exit-7 / `HTTP 000` response because the backend never listened on port 3000.

## A1 — Signup request could not reach the backend

- **Title:** Backend startup failure blocks valid signup
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; MongoDB listener on 27017; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; then issue the A1 signup request in results.md.
- **Expected:** HTTP 200/201 and a created account.
- **Actual:** Backend exits with `SyntaxError: Identifier 'express' has already been declared`; curl returns exit 7 and HTTP 000.
- **Evidence:** A1 in results.md; startup stack trace is in that file.
- **Severity justification:** The service cannot start, preventing all signup operations.
- **Priority justification:** P1 because the backend must start before core payment flows can be used.

## A2 — Duplicate signup could not be measured

- **Title:** Backend startup failure blocks duplicate-signup validation
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A2 request in results.md. A1 did not create the prerequisite user.
- **Expected:** 4xx for an existing username.
- **Actual:** Curl returns exit 7 and HTTP 000; duplicate handling was not reached.
- **Evidence:** A2 request and response in results.md.
- **Severity justification:** The backend outage prevents validation of a core signup safeguard.
- **Priority justification:** P1 because service startup blocks all dependent account flows.

## A3 — Missing-field signup could not be measured

- **Title:** Backend startup failure blocks signup input validation
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A3 empty-body request in results.md.
- **Expected:** HTTP 400 for missing required fields.
- **Actual:** Curl returns exit 7 and HTTP 000; request validation was not reached.
- **Evidence:** A3 request and response in results.md.
- **Severity justification:** The backend outage prevents validation of required signup inputs.
- **Priority justification:** P1 because service startup blocks all dependent account flows.

## A4 — Signin and token capture failed

- **Title:** Backend startup failure blocks signin
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A4 signin request in results.md.
- **Expected:** HTTP 200 and a bearer token.
- **Actual:** Curl returns exit 7 and HTTP 000; no token was captured.
- **Evidence:** A4 request and response in results.md.
- **Severity justification:** The backend outage prevents authentication and token issuance.
- **Priority justification:** P1 because signin is required for authenticated payment operations.

## A5 — Wrong-password signin could not be measured

- **Title:** Backend startup failure blocks signin credential rejection
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A5 wrong-password request in results.md.
- **Expected:** HTTP 401/403 for incorrect credentials.
- **Actual:** Curl returns exit 7 and HTTP 000; credential validation was not reached.
- **Evidence:** A5 request and response in results.md.
- **Severity justification:** The backend outage prevents authentication behavior from being tested.
- **Priority justification:** P1 because signin is required for authenticated payment operations.

## A6 — Authenticated balance read could not be measured

- **Title:** Backend startup failure blocks balance retrieval
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A6 request in results.md. A4 did not provide a token, so the request used the documented placeholder.
- **Expected:** HTTP 200 with the account balance.
- **Actual:** Curl returns exit 7 and HTTP 000; no valid token was available.
- **Evidence:** A6 request and response in results.md.
- **Severity justification:** The outage prevents users from reading balances.
- **Priority justification:** P1 because balance visibility is a core payment function.

## A7 — Unauthenticated balance rejection could not be measured

- **Title:** Backend startup failure blocks balance authorization check
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A7 request in results.md without an Authorization header.
- **Expected:** HTTP 401/403.
- **Actual:** Curl returns exit 7 and HTTP 000; authorization middleware was not reached.
- **Evidence:** A7 request and response in results.md.
- **Severity justification:** The outage prevents measurement of an access-control boundary.
- **Priority justification:** P1 because balance authorization is security-critical.

## A8 — Authenticated user search could not be measured

- **Title:** Backend startup failure blocks user search
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A8 request in results.md. A4 did not provide a valid token.
- **Expected:** HTTP 200 with search results.
- **Actual:** Curl returns exit 7 and HTTP 000; no valid token was available.
- **Evidence:** A8 request and response in results.md.
- **Severity justification:** The backend outage prevents the requested API operation from being tested.
- **Priority justification:** P1 because the backend is unavailable.

## A9 — Valid transfer could not be measured

- **Title:** Backend startup failure blocks valid transfer
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A9 request in results.md.
- **Expected:** HTTP 200 and a committed transfer.
- **Actual:** Curl returns exit 7 and HTTP 000; no valid token or recipient account was available.
- **Evidence:** A9 request and response in results.md.
- **Severity justification:** The outage blocks the application's primary money-transfer operation.
- **Priority justification:** P1 because transfers cannot be used while the backend is down.

## A10 — Unauthenticated transfer rejection could not be measured

- **Title:** Backend startup failure blocks transfer authorization check
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue A10 from results.md without an Authorization header.
- **Expected:** HTTP 401/403.
- **Actual:** Curl returns exit 7 and HTTP 000; transfer authorization was not reached.
- **Evidence:** A10 request and response in results.md.
- **Severity justification:** The outage prevents measurement of a transfer access-control boundary.
- **Priority justification:** P1 because transfer authorization is security-critical.

## A11 — Negative-amount rejection could not be measured

- **Title:** Backend startup failure blocks negative-amount validation
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A11 request in results.md.
- **Expected:** 4xx for a negative amount.
- **Actual:** Curl returns exit 7 and HTTP 000; no valid token or recipient account was available.
- **Evidence:** A11 request and response in results.md.
- **Severity justification:** The outage prevents validation of transfer amount constraints.
- **Priority justification:** P1 because invalid transfers must be prevented before release.

## A12 — Over-balance rejection could not be measured

- **Title:** Backend startup failure blocks insufficient-funds validation
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A12 request in results.md.
- **Expected:** 4xx when amount exceeds the sender's balance.
- **Actual:** Curl returns exit 7 and HTTP 000; no valid token or known balance was available.
- **Evidence:** A12 request and response in results.md.
- **Severity justification:** The outage prevents validation of the insufficient-funds guard.
- **Priority justification:** P1 because the transfer flow cannot be used or verified.

## A13 — Self-transfer rejection could not be measured

- **Title:** Backend startup failure blocks self-transfer validation
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue the A13 request in results.md. The sender ID was unavailable to verify the recipient was self.
- **Expected:** 4xx for a transfer to the same user.
- **Actual:** Curl returns exit 7 and HTTP 000; self-identity could not be established.
- **Evidence:** A13 request and response in results.md.
- **Severity justification:** The outage prevents measurement of transfer recipient validation.
- **Priority justification:** P1 because transfers cannot be used or verified.

## A14 — Exact-balance boundary could not be measured

- **Title:** Backend startup failure blocks exact-balance transfer check
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue A14 from results.md. The attempted amount was 0 because no account balance could be read.
- **Expected:** HTTP 200 when transferring the exact balance.
- **Actual:** Curl returns exit 7 and HTTP 000; the request did not represent a known exact balance.
- **Evidence:** A14 request and response in results.md.
- **Severity justification:** The outage prevents measurement of a required transfer boundary.
- **Priority justification:** P1 because transfer behavior cannot be validated.

## A15 — Balance-plus-one boundary could not be measured

- **Title:** Backend startup failure blocks balance-plus-one rejection check
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Run `node backend/index.js`; issue A15 from results.md. The attempted amount was 1000000000 because no account balance could be read.
- **Expected:** 4xx when transferring balance + 1.
- **Actual:** Curl returns exit 7 and HTTP 000; the request did not represent a known balance + 1.
- **Evidence:** A15 request and response in results.md.
- **Severity justification:** The outage prevents measurement of a required insufficient-funds boundary.
- **Priority justification:** P1 because transfer behavior cannot be validated.

## I1 — Signup-to-transfer integration could not be measured

- **Title:** Backend startup failure blocks end-to-end transfer integration
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Issue the two I1 signup requests, the transfer request, and both balance requests listed in results.md.
- **Expected:** A's balance decreases by 100 and B's increases by 100.
- **Actual:** All five requests returned curl exit 7 and HTTP 000; no users, transfer, or balances were observed.
- **Evidence:** I1 exact request ledger and literal response in results.md.
- **Severity justification:** The outage blocks end-to-end money movement.
- **Priority justification:** P1 because the primary integration flow is unavailable.

## S1 — Smoke pass could not be completed

- **Title:** Backend startup failure blocks smoke checks
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Repeat the A1, A4, A6, A9, and A12 requests as listed for S1 in results.md.
- **Expected:** All five smoke checks pass.
- **Actual:** All five requests returned curl exit 7 and HTTP 000.
- **Evidence:** S1 request references and literal response in results.md.
- **Severity justification:** The service outage prevents every smoke check from reaching the application.
- **Priority justification:** P1 because a usable backend is a release prerequisite.

## R1 — Regression matrix could not be completed

- **Title:** Backend startup failure blocks regression matrix
- **Severity:** High
- **Priority:** P1
- **Environment:** `http://127.0.0.1:3000`; Node.js v24.22.2; 2026-11-20
- **Steps to Reproduce:** Repeat A1 through A15 in order as listed for R1 in results.md.
- **Expected:** Re-run all A-matrix checks and compare their outcomes with the first run.
- **Actual:** All 15 requests returned curl exit 7 and HTTP 000, matching the first run's unavailable-service results; no application behavior was regression-tested.
- **Evidence:** R1 request references and literal response in results.md.
- **Severity justification:** The backend outage prevents functional regression validation.
- **Priority justification:** P1 because release behavior cannot be verified.

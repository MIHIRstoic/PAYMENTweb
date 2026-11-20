# P3 — Failed-row records

This file is regenerated using only the P2 result table. Its rows show failed measurements (`HTTP 000` or unchanged database snapshots), not confirmed product defects or root causes. Severity and priority cannot be assigned from that table alone; no values are inferred.

## A1 — Valid signup check received no response

- **Title:** A1 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A1 from the P2 matrix.
- **Expected:** 200/201.
- **Actual:** HTTP 000; curl exit 7.
- **Evidence:** P2 row A1.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A2 — Duplicate signup check received no response

- **Title:** A2 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A2 from the P2 matrix.
- **Expected:** 4xx.
- **Actual:** HTTP 000; curl exit 7; A1 did not create an account.
- **Evidence:** P2 row A2.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A3 — Missing-fields signup check received no response

- **Title:** A3 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A3 from the P2 matrix.
- **Expected:** 400.
- **Actual:** HTTP 000; curl exit 7.
- **Evidence:** P2 row A3.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A4 — Signin check received no response

- **Title:** A4 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A4 from the P2 matrix.
- **Expected:** 200; capture token.
- **Actual:** HTTP 000; no token captured.
- **Evidence:** P2 row A4.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A5 — Wrong-password signin check received no response

- **Title:** A5 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A5 from the P2 matrix.
- **Expected:** 401/403.
- **Actual:** HTTP 000; curl exit 7.
- **Evidence:** P2 row A5.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A6 — Authenticated balance check received no response

- **Title:** A6 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A6 from the P2 matrix.
- **Expected:** 200.
- **Actual:** HTTP 000; no valid token available.
- **Evidence:** P2 row A6.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A7 — Unauthenticated balance check received no response

- **Title:** A7 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A7 from the P2 matrix.
- **Expected:** 401/403.
- **Actual:** HTTP 000; curl exit 7.
- **Evidence:** P2 row A7.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A8 — User search check received no response

- **Title:** A8 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A8 from the P2 matrix.
- **Expected:** 200.
- **Actual:** HTTP 000; no valid token available.
- **Evidence:** P2 row A8.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A9 — Valid transfer check received no response

- **Title:** A9 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A9 from the P2 matrix.
- **Expected:** 200.
- **Actual:** HTTP 000; no valid token or recipient account available.
- **Evidence:** P2 row A9.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A10 — Unauthenticated transfer check received no response

- **Title:** A10 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A10 from the P2 matrix.
- **Expected:** 401/403.
- **Actual:** HTTP 000; curl exit 7.
- **Evidence:** P2 row A10.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A11 — Negative-amount transfer check received no response

- **Title:** A11 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A11 from the P2 matrix.
- **Expected:** 4xx.
- **Actual:** HTTP 000; no valid token or recipient account available.
- **Evidence:** P2 row A11.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A12 — Over-balance transfer check received no response

- **Title:** A12 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A12 from the P2 matrix.
- **Expected:** 4xx.
- **Actual:** HTTP 000; no valid token or account balance available.
- **Evidence:** P2 row A12.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A13 — Self-transfer check received no response

- **Title:** A13 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A13 from the P2 matrix.
- **Expected:** 4xx.
- **Actual:** HTTP 000; self-transfer identity could not be established.
- **Evidence:** P2 row A13.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A14 — Exact-balance transfer check received no response

- **Title:** A14 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A14 from the P2 matrix.
- **Expected:** 200 for exact balance.
- **Actual:** HTTP 000; exact balance unavailable (request amount was 0).
- **Evidence:** P2 row A14.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## A15 — Balance-plus-one transfer check received no response

- **Title:** A15 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run check A15 from the P2 matrix.
- **Expected:** 4xx for balance + 1.
- **Actual:** HTTP 000; exact balance unavailable (request amount was 1000000000).
- **Evidence:** P2 row A15.
- **Severity justification:** The P2 row records no HTTP response, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## I1 — Integration check received no response

- **Title:** I1 — No HTTP response
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run integration check I1 from the P2 matrix.
- **Expected:** A decreases by 100; B increases by 100.
- **Actual:** Both signup requests, transfer, and both balance requests returned HTTP 000.
- **Evidence:** P2 row I1.
- **Severity justification:** The P2 row records no HTTP responses, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## S1 — Smoke check requests received no response

- **Title:** S1 — No HTTP responses
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run smoke check S1 from the P2 matrix.
- **Expected:** A1, A4, A6, A9, and A12 all pass.
- **Actual:** All five curl requests returned HTTP 000.
- **Evidence:** P2 row S1.
- **Severity justification:** The P2 row records no HTTP responses, not user impact.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

## D1 — Database balance change was not observed

- **Title:** D1 — Account documents did not change
- **Severity:** Undetermined
- **Priority:** Undetermined
- **Environment:** Not specified in the P2 result table.
- **Steps to Reproduce:** Run D1's before-and-after account queries around the integration transfer.
- **Expected:** Account balances change after transfer.
- **Actual:** The query returned `[]` before and after.
- **Evidence:** P2 row D1.
- **Severity justification:** The P2 row records unchanged data but provides no user-impact assessment.
- **Priority justification:** The P2 row contains no scheduling or release-priority evidence.

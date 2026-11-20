# P2 — Measurement run

## Environment and startup

Target: `http://127.0.0.1:3000`  
Date: 2026-11-20  
MongoDB had a listener on port 27017. The backend did not start because `backend/routes/index.js` has a duplicate `const express` declaration.

Startup command:

```text
$ node backend/index.js
/workspaces/PAYMENTweb/backend/routes/index.js:13
const express = require('express');
      ^

SyntaxError: Identifier 'express' has already been declared
    at wrapSafe (node:internal/modules/cjs/loader:1861:18)
    at Module._compile (node:internal/modules/cjs/loader:1903:10)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Function._load (node:internal/modules/cjs/loader:1462:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.require (node:internal/modules/cjs/loader:1688:12)
    at require (node:internal/modules/helpers:135:16)
    at Object.<anonymous> (/workspaces/PAYMENTweb/backend/index.js:4:20)

Node.js v24.22.2
```

Literal output from every HTTP curl below:

```text
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server

HTTP 000
```

`HTTP 000` is curl's no-response value, not an HTTP response code returned by the application. The authenticated checks used `Bearer unavailable-token` because A4 could not produce a token. The signup, transfer, and balance preconditions could therefore not be established.

## P2 result table

| ID | Type | Expected | Actual | Status |
|---|---|---|---|---|
| A1 | Functional | 200/201 | HTTP 000; curl exit 7 | Failed |
| A2 | Functional | 4xx | HTTP 000; curl exit 7; A1 did not create an account | Failed |
| A3 | Functional | 400 | HTTP 000; curl exit 7 | Failed |
| A4 | Functional | 200; capture token | HTTP 000; no token captured | Failed |
| A5 | Functional | 401/403 | HTTP 000; curl exit 7 | Failed |
| A6 | API | 200 | HTTP 000; no valid token available | Failed |
| A7 | API | 401/403 | HTTP 000; curl exit 7 | Failed |
| A8 | API | 200 | HTTP 000; no valid token available | Failed |
| A9 | API | 200 | HTTP 000; no valid token or recipient account available | Failed |
| A10 | API | 401/403 | HTTP 000; curl exit 7 | Failed |
| A11 | Negative | 4xx | HTTP 000; no valid token or recipient account available | Failed |
| A12 | Negative | 4xx | HTTP 000; no valid token or account balance available | Failed |
| A13 | Negative | 4xx | HTTP 000; self-transfer identity could not be established | Failed |
| A14 | Boundary | 200 for exact balance | HTTP 000; exact balance was unavailable (request amount was 0) | Failed |
| A15 | Boundary | 4xx for balance + 1 | HTTP 000; exact balance was unavailable (request amount was 1000000000) | Failed |
| I1 | Integration | A decreases by 100; B increases by 100 | Both signup requests, transfer, and both balance requests returned HTTP 000 | Failed |
| D1 | Database | Account balances changed in MongoDB | `mongosh` was not installed; before/after queries could not execute | Not executed |
| S1 | Smoke | A1, A4, A6, A9, A12 all pass | All five curl requests returned HTTP 000 | Failed |
| U1 | UI | Inspect /signin and /signup at 1280px and 375px | not executed: no browser | Not executed |
| R1 | Regression | Re-run A-matrix and compare with first run | All 15 curl requests again returned HTTP 000; same unavailable-service result as first run | Failed |

### Summary

18 executed, 0 passed, 18 failed

### Results by type

| Type | Checks | Passed | Failed |
|---|---:|---:|---:|
| Functional | 5 | 0 | 5 |
| API | 5 | 0 | 5 |
| Negative | 3 | 0 | 3 |
| Boundary | 2 | 0 | 2 |
| Integration | 1 | 0 | 1 |
| Database | 0 executed (1 not executed) | 0 | 0 |
| Smoke | 5 requests | 0 | 5 |
| UI | 0 executed (1 not executed) | 0 | 0 |
| Regression | 15 requests | 0 | 15 |

The “Checks” count for Smoke and Regression is the number of HTTP requests in each run, not the number of matrix rows.

## Exact requests and outputs

Each curl invocation listed here returned the literal HTTP output shown above.

| Check | Exact request |
|---|---|
| A1, A2 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{"username":"qa.a.20261120@example.com","firstName":"QA","lastName":"Runner","password":"QaTest123!"}'` |
| A3 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{}'` |
| A4 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signin -H 'Content-Type: application/json' -d '{"username":"qa.a.20261120@example.com","password":"QaTest123!"}'` |
| A5 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signin -H 'Content-Type: application/json' -d '{"username":"qa.a.20261120@example.com","password":"WrongPass123!"}'` |
| A6 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -H 'Authorization: Bearer unavailable-token' http://127.0.0.1:3000/api/v1/account/balance` |
| A7 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 http://127.0.0.1:3000/api/v1/account/balance` |
| A8 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -H 'Authorization: Bearer unavailable-token' 'http://127.0.0.1:3000/api/v1/user/bulk?filter=QA'` |
| A9, A10 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":100,"to":"507f1f77bcf86cd799439011"}'` (A10 omitted the Authorization header.) |
| A11 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":-1,"to":"507f1f77bcf86cd799439011"}'` |
| A12 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":999999999,"to":"507f1f77bcf86cd799439011"}'` |
| A13 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":1,"to":"507f1f77bcf86cd799439011"}'` |
| A14 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":0,"to":"507f1f77bcf86cd799439011"}'` |
| A15 | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":1000000000,"to":"507f1f77bcf86cd799439011"}'` |
| I1 signup A | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{"username":"qa.integration.a.20261120@example.com","firstName":"Integration","lastName":"A","password":"QaTest123!"}'` |
| I1 signup B | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{"username":"qa.integration.b.20261120@example.com","firstName":"Integration","lastName":"B","password":"QaTest123!"}'` |
| I1 transfer | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -X POST http://127.0.0.1:3000/api/v1/account/transfer -H 'Content-Type: application/json' -H 'Authorization: Bearer unavailable-token' -d '{"amount":100,"to":"507f1f77bcf86cd799439011"}'` |
| I1 balances | `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3 -H 'Authorization: Bearer unavailable-token' http://127.0.0.1:3000/api/v1/account/balance` (issued once for each user) |
| S1-A1, S1-A4, S1-A6, S1-A9, S1-A12 | Repeated the corresponding A1, A4, A6, A9, and A12 requests above, in that order. |
| R1-A1 through R1-A15 | Repeated the corresponding A1 through A15 requests above, in order. |

The A14 and A15 HTTP attempts did not exercise the requested exact-balance or balance-plus-one conditions: signup and balance retrieval failed, so no known balance or valid authorization token existed.

## Database command output

Both before and after attempts used:

```text
$ mongosh paytm --eval 'db.accounts.find().toArray()'
/bin/bash: line 1: mongosh: command not found
```

No database balance values were observed.

## UI observation

not executed: no browser

## Failures

- **A1:** valid signup request above; expected 200/201; actual literal curl output above.
- **A2:** duplicate signup request above; expected 4xx; actual literal curl output above. A1 did not create a user.
- **A3:** empty JSON signup request above; expected 400; actual literal curl output above.
- **A4:** valid signin request above; expected 200 and a token; actual literal curl output above.
- **A5:** wrong-password signin request above; expected 401/403; actual literal curl output above.
- **A6:** authenticated balance GET above; expected 200; actual literal curl output above; no token was available.
- **A7:** unauthenticated balance GET above; expected 401/403; actual literal curl output above.
- **A8:** authenticated user-search GET above; expected 200; actual literal curl output above; no token was available.
- **A9:** valid transfer request above; expected 200; actual literal curl output above; no valid token or recipient account was available.
- **A10:** unauthenticated transfer request above; expected 401/403; actual literal curl output above.
- **A11:** negative transfer request above; expected 4xx; actual literal curl output above; no valid token or recipient account was available.
- **A12:** over-balance transfer request above; expected 4xx; actual literal curl output above; no valid token or balance was available.
- **A13:** self-transfer request above; expected 4xx; actual literal curl output above; no user identity was available to establish that the recipient was self.
- **A14:** zero-amount transfer request above was attempted in place of exact balance because no balance was available; expected exact-balance transfer 200; actual literal curl output above.
- **A15:** amount 1000000000 transfer request above was attempted without a known balance; expected balance-plus-one 4xx; actual literal curl output above.
- **I1:** both signup requests, the transfer request, and the two balance GET requests above returned the same literal curl output; expected A -100 and B +100.
- **S1:** repeated A1, A4, A6, A9, and A12; each returned the same literal curl output; expected all five to pass.
- **R1:** repeated A1 through A15; each returned the same literal curl output as the first run; expected the full matrix to pass and be comparable.

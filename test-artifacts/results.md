# P2 — Measurement run

Target: `http://127.0.0.1:3000`  
Date: 2026-11-20

## Environment

- Docker: `paymongo` (`mongo:7`) was running and publishing port 27017.
- `MONGO_URL` was unset; the backend default is `mongodb://127.0.0.1:27017/paytm`.
- Backend is configured to call `app.listen(3000)`, but no process listened on port 3000.
- Startup attempt: `node backend/index.js` failed before connecting to MongoDB:

```text
/workspaces/PAYMENTweb/backend/routes/index.js:13
const express = require('express');
      ^

SyntaxError: Identifier 'express' has already been declared
    at wrapSafe (node:internal/modules/cjs/loader:1861:18)
    at Module._compile (node:internal/modules/cjs/loader:1903:20)
    at Object..js (node:internal/modules/cjs/loader:2060:14)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:24)
    at Module.require (node:internal/modules/cjs/loader:1674:12)
    at require (node:internal/modules/helpers:157:16)
    at Object.<anonymous> (/workspaces/PAYMENTweb/backend/index.js:4:20)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)

Node.js v24.22.2
```

Literal output from every HTTP curl request:

```text
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server

HTTP 000
```

`HTTP 000` is curl's no-response value, not an HTTP response code from the app. A4 could not yield a token; dependent authenticated requests used the documented placeholder token. Signup and transfer preconditions could not be established.

## P2 result table

| ID | Type | Expected | Actual | Status |
|---|---|---|---|---|
| A1 | Functional | 200/201 | HTTP 000; curl exit 7 | Failed |
| A2 | Functional | 4xx | HTTP 000; A1 did not create an account | Failed |
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
| A14 | Boundary | 200 for exact balance | HTTP 000; no known balance (request amount was 0) | Failed |
| A15 | Boundary | 4xx for balance + 1 | HTTP 000; no known balance (request amount was 1000000000) | Failed |
| I1 | Integration | A decreases by 100; B increases by 100 | Both signup calls, transfer, and both balance calls returned HTTP 000 | Failed |
| D1 | Database | Balances changed in MongoDB | `[]` before transfer and `[]` after transfer; no balance change | Failed |
| S1 | Smoke | A1, A4, A6, A9, A12 all pass | All five curl requests returned HTTP 000 | Failed |
| U1 | UI | Inspect /signin and /signup at 1280px and 375px | not executed: no browser | Not executed |
| R1 | Regression | Re-run A-matrix and compare | not executed: no browser | Not executed |

### Summary

18 executed, 0 passed, 18 failed

U1 and R1 were not executed because no browser tool was available. Their rows are excluded from the execution count.

### Results by type

| Type | Checks | Passed | Failed |
|---|---:|---:|---:|
| Functional | 5 | 0 | 5 |
| API | 5 | 0 | 5 |
| Negative | 3 | 0 | 3 |
| Boundary | 2 | 0 | 2 |
| Integration | 5 requests | 0 | 5 |
| Database | 1 before/after comparison | 0 | 1 |
| Smoke | 5 requests | 0 | 5 |
| UI | 0 executed | 0 | 0 |
| Regression | 0 executed | 0 | 0 |

The Integration and Smoke rows count their component HTTP requests. The summary above counts the 18 executed matrix IDs.

## Exact HTTP requests

All commands below used `curl -sS -i -w '\nHTTP %{http_code}\n' --max-time 3`; each returned the literal HTTP output shown above.

| Check | Exact request |
|---|---|
| A1, A2 | `POST http://127.0.0.1:3000/api/v1/user/signup` with `Content-Type: application/json`, body `{"username":"qa.a.20261120@example.com","firstName":"QA","lastName":"Runner","password":"QaTest123!"}` |
| A3 | `POST http://127.0.0.1:3000/api/v1/user/signup` with `Content-Type: application/json`, body `{}` |
| A4 | `POST http://127.0.0.1:3000/api/v1/user/signin` with `Content-Type: application/json`, body `{"username":"qa.a.20261120@example.com","password":"QaTest123!"}` |
| A5 | `POST http://127.0.0.1:3000/api/v1/user/signin` with `Content-Type: application/json`, body `{"username":"qa.a.20261120@example.com","password":"WrongPass123!"}` |
| A6 | `GET http://127.0.0.1:3000/api/v1/account/balance` with `Authorization: Bearer unavailable-token` |
| A7 | `GET http://127.0.0.1:3000/api/v1/account/balance` without Authorization |
| A8 | `GET http://127.0.0.1:3000/api/v1/user/bulk?filter=QA` with `Authorization: Bearer unavailable-token` |
| A9 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":100,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| A10 | Same method, URL, content type, and body as A9; no Authorization header |
| A11 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":-1,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| A12 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":999999999,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| A13 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":1,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| A14 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":0,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| A15 | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":1000000000,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| I1 signup A | `POST http://127.0.0.1:3000/api/v1/user/signup` with `Content-Type: application/json`, body `{"username":"qa.integration.a.20261120@example.com","firstName":"Integration","lastName":"A","password":"QaTest123!"}` |
| I1 signup B | `POST http://127.0.0.1:3000/api/v1/user/signup` with `Content-Type: application/json`, body `{"username":"qa.integration.b.20261120@example.com","firstName":"Integration","lastName":"B","password":"QaTest123!"}` |
| I1 transfer | `POST http://127.0.0.1:3000/api/v1/account/transfer` with `Content-Type: application/json`, body `{"amount":100,"to":"507f1f77bcf86cd799439011"}`, and `Authorization: Bearer unavailable-token` |
| I1 balances | `GET http://127.0.0.1:3000/api/v1/account/balance` with `Authorization: Bearer unavailable-token`, once for each user |
| S1-A1, S1-A4, S1-A6, S1-A9, S1-A12 | Repeated the corresponding A1, A4, A6, A9, and A12 requests above, in that order. |

No endpoint returned an application response, so this run could not establish that any endpoint is absent or not implemented. A14 and A15 also could not exercise the requested exact-balance and balance-plus-one conditions because no account balance was available.

## D1 database output

Executed before and after the integration transfer attempt inside the MongoDB container:

```text
$ docker exec paymongo mongosh paytm --quiet --eval 'db.accounts.find().toArray()'
[]

$ docker exec paymongo mongosh paytm --quiet --eval 'db.accounts.find().toArray()'
[]
```

## Failures: exact request and response

- **A1-A15:** Each exact request is listed in the request table above. Each returned the literal curl output at the start of this report (`curl: (7) Failed to connect to 127.0.0.1 port 3000 ...`, followed by `HTTP 000`).
- **I1:** Both signup requests, the transfer request, and the two balance requests are listed above; each returned the same literal curl output.
- **D1:** The two exact `mongosh` commands are shown above; each returned `[]`, so balances did not change.
- **S1:** The five repeated requests are listed above; each returned the same literal curl output.
- **U1:** not executed: no browser.
- **R1:** not executed: no browser.

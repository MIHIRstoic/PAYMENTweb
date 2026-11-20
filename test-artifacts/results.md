# P2 — Measurement run

Target: `http://127.0.0.1:3000`

Database: `paytm` on a local MongoDB 7 single-node replica set at `127.0.0.1:27018`

Backend connection: `MONGO_URL=mongodb://127.0.0.1:27018/paytm?replicaSet=rs0`

Date: 2026-11-20

The complete measurement used a separate local replica set because the transfer route uses MongoDB transactions. The replica set reported `isWritablePrimary: true`; the backend logged `Backend listening on port 3000`. A real GET returned `{"user":[]}` with HTTP 200 before the matrix. All credentials were test-only. JWTs are redacted below.

## P2 result table

| ID | Type | Expected | Actual | Status |
|---|---|---|---|---|
| A1 | Functional | 200/201 | HTTP 200 | Passed |
| A2 | Functional | 4xx | HTTP 409 | Passed |
| A3 | Functional | 400 | HTTP 400 | Passed |
| A4 | Functional | HTTP 200; capture token | HTTP 200; token captured (redacted) | Passed |
| A5 | Functional | 401/403 | HTTP 401 | Passed |
| A6 | API | HTTP 200 | HTTP 200; balance `3702.351269317157` | Passed |
| A7 | API | 401/403 | HTTP 403 | Passed |
| A8 | API | HTTP 200 | HTTP 200; matching user returned | Passed |
| A9 | API | HTTP 200 | HTTP 200 | Passed |
| A10 | API | 401/403 | HTTP 403 | Passed |
| A11 | Negative | 4xx | HTTP 200 | **Failed** |
| A12 | Negative | 4xx | HTTP 400 | Passed |
| A13 | API | 4xx | HTTP 200 | **Failed** |
| A14 | Boundary | HTTP 200 for exact balance | HTTP 200; balance became `0` | Passed |
| A15 | Boundary | 4xx for balance + 1 | HTTP 400 | Passed |
| I1 | Integration | A -100; B +100 | A `7887.82841908881` → `7787.82841908881`; B `6013.549350847303` → `6113.549350847303` | Passed |
| D1 | Database | Balances changed in MongoDB | Both account balances changed by 100 in the database | Passed |
| S1 | Smoke | A1, A4, A6, A9, A12 all pass | HTTP `200, 200, 200, 200, 400` | Passed |
| U1 | UI | Inspect `/signin` and `/signup` at 1280px and 375px | not executed: no browser | Not executed |
| R1 | Regression | Re-run A-matrix and compare | not executed: no browser | Not executed |

18 executed, 16 passed, 2 failed

U1 and R1 are excluded from the execution count, as requested when no browser is available.

## Results by type

| Type | Checks | Passed | Failed |
|---|---:|---:|---:|
| Functional | 5 | 5 | 0 |
| API | 6 | 5 | 1 |
| Negative | 2 | 1 | 1 |
| Boundary | 2 | 2 | 0 |
| Integration | 1 | 1 | 0 |
| Database | 1 | 1 | 0 |
| Smoke | 1 | 1 | 0 |
| UI | 0 executed | 0 | 0 |
| Regression | 0 executed | 0 | 0 |
| **Total** | **18** | **16** | **2** |

## Literal curl requests and responses

Each HTTP check was issued with `curl -sS`; an inline helper captured the status using `-w '||HTTP:%{http_code}'` and printed the response body and status on separate lines as shown below. The authorization JWT is redacted in this record; requests used the actual captured token. Unless otherwise shown, requests had no curl error.

### A1–A8

**A1 — signup, valid new user**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/user/signup \
  -H 'Content-Type: application/json' \
  -d '{"username":"a20261120@example.com","firstName":"Matrix","lastName":"A","password":"QaTest123!"}'
```

```text
{"message":"User created successfully","token":"[REDACTED]"}
HTTP 200
```

**A2 — signup, duplicate username**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/user/signup \
  -H 'Content-Type: application/json' \
  -d '{"username":"a20261120@example.com","firstName":"Matrix","lastName":"A","password":"QaTest123!"}'
```

```text
{"message":"Email already taken/Incorrect inputs"}
HTTP 409
```

**A3 — signup, missing fields**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/user/signup \
  -H 'Content-Type: application/json' -d '{}'
```

```text
{"message":"Email already taken / Incorrect inputs"}
HTTP 400
```

**A4 — signin, correct password**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/user/signin \
  -H 'Content-Type: application/json' \
  -d '{"username":"a20261120@example.com","password":"QaTest123!"}'
```

```text
{"token":"[REDACTED]"}
HTTP 200
```

**A5 — signin, wrong password**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/user/signin \
  -H 'Content-Type: application/json' \
  -d '{"username":"a20261120@example.com","password":"WrongPass123!"}'
```

```text
{"message":"Error while logging in"}
HTTP 401
```

**A6 — GET balance with token**

```sh
curl -sS -w '\nHTTP %{http_code}\n' \
  -H 'Authorization: Bearer [REDACTED]' \
  http://127.0.0.1:3000/api/v1/account/balance
```

```text
{"balance":3702.351269317157}
HTTP 200
```

**A7 — GET balance without token**

```sh
curl -sS -w '\nHTTP %{http_code}\n' \
  http://127.0.0.1:3000/api/v1/account/balance
```

```text
{}
HTTP 403
```

**A8 — GET users search with token**

```sh
curl -sS -w '\nHTTP %{http_code}\n' \
  -H 'Authorization: Bearer [REDACTED]' \
  'http://127.0.0.1:3000/api/v1/user/bulk?filter=Matrix'
```

```text
{"user":[{"username":"a20261120@example.com","firstName":"Matrix","lastName":"A","_id":"6b0087d394befb16f854e543"}]}
HTTP 200
```

### A9–A15

Recipient B was created with username `b20261120@example.com`; its ID was `6b0087d494befb16f854e54d`.

**A9 — valid transfer, amount 1**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":1,"to":"6b0087d494befb16f854e54d"}'
```

```text
{"message":"Transfer successful"}
HTTP 200
```

**A10 — transfer without token**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' \
  -d '{"amount":1,"to":"6b0087d494befb16f854e54d"}'
```

```text
{}
HTTP 403
```

**A11 — negative transfer amount**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":-1,"to":"6b0087d494befb16f854e54d"}'
```

```text
{"message":"Transfer successful"}
HTTP 200
```

**A12 — transfer more than balance**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":999999999,"to":"6b0087d494befb16f854e54d"}'
```

```text
{"message":"Insufficient balance"}
HTTP 400
```

**A13 — transfer to self**

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":1,"to":"6b0087d394befb16f854e543"}'
```

```text
{"message":"Transfer successful"}
HTTP 200
```

**A14 — transfer exact balance**

The precondition GET returned `{"balance":3702.351269317157}` with HTTP 200. The transfer used that exact amount:

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":3702.351269317157,"to":"6b0087d494befb16f854e54d"}'
```

```text
{"message":"Transfer successful"}
HTTP 200
```

The following GET returned `{"balance":0}` with HTTP 200.

**A15 — transfer balance + 1**

After A14 the balance was 0, so the request amount was 1:

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":1,"to":"6b0087d494befb16f854e54d"}'
```

```text
{"message":"Insufficient balance"}
HTTP 400
```

### I1 — integration transfer

Users C and D were signed up as `c20261120@example.com` and `d20261120@example.com`. C started at `7887.82841908881`; D started at `6013.549350847303`.

```sh
curl -sS -w '\nHTTP %{http_code}\n' -X POST http://127.0.0.1:3000/api/v1/account/transfer \
  -H 'Content-Type: application/json' -H 'Authorization: Bearer [REDACTED]' \
  -d '{"amount":100,"to":"6b0087e894befb16f854e564"}'
```

```text
{"message":"Transfer successful"}
HTTP 200
```

The authenticated balance GETs returned:

```text
{"balance":7787.82841908881}
HTTP 200

{"balance":6113.549350847303}
HTTP 200
```

### D1 — database before and after I1

Command:

```sh
docker exec paymongo-rs mongosh paytm --port 27018 --quiet --eval 'db.accounts.find().toArray()'
```

Before transfer:

```text
[
  {
    _id: ObjectId('6b0087d394befb16f854e545'),
    userId: ObjectId('6b0087d394befb16f854e543'),
    balance: 3702.351269317157,
    __v: 0
  },
  {
    _id: ObjectId('6b0087d494befb16f854e54f'),
    userId: ObjectId('6b0087d494befb16f854e54d'),
    balance: 6459.025795714645,
    __v: 0
  },
  {
    _id: ObjectId('6b0087e894befb16f854e561'),
    userId: ObjectId('6b0087e894befb16f854e55f'),
    balance: 7887.82841908881,
    __v: 0
  },
  {
    _id: ObjectId('6b0087e894befb16f854e566'),
    userId: ObjectId('6b0087e894befb16f854e564'),
    balance: 6013.549350847303,
    __v: 0
  }
]
```

After transfer:

```text
[
  {
    _id: ObjectId('6b0087d394befb16f854e545'),
    userId: ObjectId('6b0087d394befb16f854e543'),
    balance: 3702.351269317157,
    __v: 0
  },
  {
    _id: ObjectId('6b0087d494befb16f854e54f'),
    userId: ObjectId('6b0087d494befb16f854e54d'),
    balance: 6459.025795714645,
    __v: 0
  },
  {
    _id: ObjectId('6b0087e894befb16f854e561'),
    userId: ObjectId('6b0087e894befb16f854e55f'),
    balance: 7787.82841908881,
    __v: 0
  },
  {
    _id: ObjectId('6b0087e894befb16f854e566'),
    userId: ObjectId('6b0087e894befb16f854e564'),
    balance: 6113.549350847303,
    __v: 0
  }
]
```

The first two test accounts had already undergone A9/A11/A13 before this I1 snapshot. In the before/after comparison for the I1 users, C decreased by 100 and D increased by 100.

### S1 — smoke sequence

The sequence used the new user `e20261120@example.com`; the valid transfer amount was 1 and the over-balance amount was `999999999`.

```text
S1 A1 signup:
{"message":"User created successfully","token":"[REDACTED]"}
HTTP 200

S1 A4 signin:
{"token":"[REDACTED]"}
HTTP 200

S1 A6 balance:
{"balance":4984.711464331146}
HTTP 200

S1 A9 valid transfer:
{"message":"Transfer successful"}
HTTP 200

S1 A12 more than balance:
{"message":"Insufficient balance"}
HTTP 400
```

## Failures: exact request and response

**A11 — negative amount accepted**

Request: `POST http://127.0.0.1:3000/api/v1/account/transfer`, `Content-Type: application/json`, `Authorization: Bearer [REDACTED]`, body `{"amount":-1,"to":"6b0087d494befb16f854e54d"}`.

```text
{"message":"Transfer successful"}
HTTP 200
```

**A13 — self-transfer accepted**

Request: `POST http://127.0.0.1:3000/api/v1/account/transfer`, `Content-Type: application/json`, `Authorization: Bearer [REDACTED]`, body `{"amount":1,"to":"6b0087d394befb16f854e543"}` (recipient is the authenticated user's ID).

```text
{"message":"Transfer successful"}
HTTP 200
```

U1 and R1: not executed: no browser.

## P4 — Reconciliation checks

The following local checks reconcile the documentation counts; they do not represent additional application tests.

```sh
rg -c '^\| TC[0-9]{2} \|' test-artifacts/test-cases.md
```

```text
30
```

```sh
rg -c '^\| TC[0-9]{2} .*\| Passed \|' test-artifacts/test-cases.md
rg -c '^\| TC[0-9]{2} .*\| Failed \|' test-artifacts/test-cases.md
rg -c '^\| TC[0-9]{2} .*\| Not run \|' test-artifacts/test-cases.md
```

```text
14
2
14
```

```sh
rg -c '^## A(11|13) —' test-artifacts/defects.md
rg -c '\*\*Severity:\*\* High' test-artifacts/defects.md
rg -c '\*\*Severity:\*\* Medium' test-artifacts/defects.md
```

```text
2
1
1
```

```sh
awk -F'|' '/^\| A[0-9]+ \|/ || /^\| (I1|D1|S1) \|/ { status=$6; gsub(/\*/, "", status); gsub(/^[[:space:]]+|[[:space:]]+$/, "", status); total++; if (status == "Passed") passed++; else if (status == "Failed") failed++; } /^\| (U1|R1) \|/ { notrun++; } END { printf "executed=%d passed=%d failed=%d not_executed=%d\n", total, passed, failed, notrun; }' test-artifacts/results.md
rg -c '^\| (Signup and signin|Authenticated and unauthenticated API behavior|Invalid negative and over-balance amounts|Zero, exact-balance, and balance-plus-one transfer boundaries|MongoDB account state|Signup, transfer, and balances across two users|Selected core checks in one pass) \|' test-artifacts/coverage.md
```

```text
executed=18 passed=16 failed=2 not_executed=2
7
```

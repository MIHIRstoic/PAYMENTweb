# P3 — Test cases

Target: `http://127.0.0.1:3000`
Database: `paytm` on MongoDB 7 replica set at `127.0.0.1:27018`

These 30 cases use the P2 environment and expected behaviors. `Actual` and `Status` report P2 evidence only; unmeasured scenarios are explicitly marked not run.

| ID | Requirement | Type | Precondition | Steps | Test Data | Expected | Actual | Status |
|---|---|---|---|---|---|---|---|---|
| TC01 | Create a new user | Positive | Backend available; username unused | POST `/api/v1/user/signup` | `a20261120@example.com`, Matrix A, `QaTest123!` | 200/201 and token | A1: HTTP 200; user created | Passed |
| TC02 | Reject duplicate username | Negative | TC01 user exists | Repeat signup with same username | `a20261120@example.com` and valid fields | 4xx | A2: HTTP 409 | Passed |
| TC03 | Reject missing signup fields | Negative | Backend available | POST signup with empty JSON | `{}` | 400 | A3: HTTP 400 | Passed |
| TC04 | Require a username | Negative | Backend available | POST signup without `username` | Other fields valid | 4xx | Not executed in P2 | Not run |
| TC05 | Reject malformed signup email | Negative | Backend available | POST signup with malformed email | `not-an-email` and other valid fields | 400 | Not executed in P2 | Not run |
| TC06 | Reject short signup password | Boundary | Backend available | POST signup with password shorter than minimum length | `short` | 400 | Not executed in P2 | Not run |
| TC07 | Sign in with correct credentials | Positive | TC01 user exists | POST `/api/v1/user/signin` | `a20261120@example.com` / `QaTest123!` | 200 and token | A4: HTTP 200; token captured and redacted | Passed |
| TC08 | Reject incorrect password | Negative | TC01 user exists | POST signin with incorrect password | `a20261120@example.com` / `WrongPass123!` | 401/403 | A5: HTTP 401 | Passed |
| TC09 | Reject unknown signin user | Negative | Backend available | POST signin with valid-format unknown email | `unknown@example.com` / `QaTest123!` | 401/403 | Not executed in P2 | Not run |
| TC10 | Reject missing signin password | Negative | TC01 user exists | POST signin without password | `a20261120@example.com` | 4xx | Not executed in P2 | Not run |
| TC11 | Reject malformed signin email | Negative | Backend available | POST signin with malformed email | `not-an-email` / `QaTest123!` | 400 | Not executed in P2 | Not run |
| TC12 | Read balance with valid token | Permission | Signed-in user and valid token | GET `/api/v1/account/balance` with bearer token | A's token | 200 and balance | A6: HTTP 200; `3702.351269317157` | Passed |
| TC13 | Deny balance access without token | Permission | Backend available | GET balance without Authorization | No token | 401/403 | A7: HTTP 403 | Passed |
| TC14 | Deny balance access with malformed token | Permission | Backend available | GET balance with bearer token | `invalid-token` | 401/403 | Not executed in P2 | Not run |
| TC15 | Search users with token | Positive | User data exists; signed-in user has token | GET `/api/v1/user/bulk?filter=Matrix` with bearer token | Filter `Matrix`; A's token | 200 and matching user | A8: HTTP 200; A returned | Passed |
| TC16 | Search users with no match | Positive | Backend available | GET user bulk search | Filter `no-such-user-20261120` | 200 and empty list | Not executed in P2 | Not run |
| TC17 | Transfer a valid amount | Positive | A and B exist; A has sufficient funds | POST transfer with A's token | Amount `1`; recipient B (`6b0087d494befb16f854e54d`) | 200 | A9: HTTP 200; transfer successful | Passed |
| TC18 | Deny transfer without token | Permission | Recipient B exists | POST transfer without Authorization | Amount `1`; recipient B | 401/403 | A10: HTTP 403 | Passed |
| TC19 | Reject negative transfer amount | Boundary / Negative | A and B exist; A has valid token | POST transfer | Amount `-1`; recipient B | 4xx | A11: HTTP 200; `Transfer successful` | Failed |
| TC20 | Reject amount greater than balance | Negative | A and B exist; A has valid token | POST transfer | Amount `999999999`; recipient B | 4xx | A12: HTTP 400; `Insufficient balance` | Passed |
| TC21 | Reject transfer to self | Negative | A has valid token and known user ID | POST transfer to A's own ID | Amount `1`; recipient A (`6b0087d394befb16f854e543`) | 4xx | A13: HTTP 200; `Transfer successful` | Failed |
| TC22 | Reject zero-amount transfer | Boundary | Sender, recipient, and valid token exist | POST transfer | Amount `0`; recipient B | 4xx; zero must not be accepted as a money transfer | Not executed in P2 | Not run |
| TC23 | Transfer the exact balance | Boundary | A has a known balance; B exists | GET balance, then transfer exactly that amount | `3702.351269317157`; recipient B | 200; sender balance becomes 0 | A14: HTTP 200; subsequent balance was `0` | Passed |
| TC24 | Reject balance plus one | Boundary | A's post-TC23 balance is known; B exists | POST transfer for balance + 1 | Amount `1`; recipient B | 4xx | A15: HTTP 400; `Insufficient balance` | Passed |
| TC25 | Transfer 100 between two signed-up users | Integration / Positive | C and D signed up; C has at least 100 | Transfer 100 C→D, then GET both balances | C: `7887.82841908881`; D: `6013.549350847303` | C -100; D +100 | I1: C `7787.82841908881`; D `6113.549350847303` | Passed |
| TC26 | Reject transfer with missing amount | Negative | Sender, recipient, and valid token exist | POST transfer without `amount` | Recipient B | 4xx | Not executed in P2 | Not run |
| TC27 | Reject transfer with missing recipient | Negative | Sender has valid token | POST transfer without `to` | Positive amount `1` | 4xx | Not executed in P2 | Not run |
| TC28 | Reject malformed recipient ID | Negative | Sender has valid token | POST transfer to malformed ID | Amount `1`; recipient `invalid-id` | 4xx | Not executed in P2 | Not run |
| TC29 | Reject string transfer amount | Negative | Sender, recipient, and valid token exist | POST transfer | Amount `"1"` as a string; recipient B | 4xx | Not executed in P2 | Not run |
| TC30 | Accept a small positive transfer | Boundary / Positive | Sender, recipient, and valid token exist; sufficient funds | POST transfer | Amount `1`; recipient B | 200 | Not executed in P2 | Not run |

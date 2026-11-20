# P3 — Test cases

These 30 cases reflect the requested signup, signin, balance, search, and transfer scope. `Actual` and `Status` are limited to P2 evidence; cases without a corresponding P2 request are explicitly unrun.

| ID | Requirement | Type | Precondition | Steps | Test Data | Expected | Actual | Status |
|---|---|---|---|---|---|---|---|---|
| TC01 | Create a new user | Positive | Backend available | POST signup | `qa.a.20261120@example.com`, valid fields | 200/201 | A1: HTTP 000; curl exit 7 | Failed |
| TC02 | Reject duplicate username | Negative | User already exists | POST signup twice | Same username and valid fields | 4xx | A2: HTTP 000; A1 did not create the user | Failed |
| TC03 | Reject missing signup fields | Negative | Backend available | POST signup | `{}` | 400 | A3: HTTP 000; curl exit 7 | Failed |
| TC04 | Require a username | Negative | Backend available | POST signup without username | Other signup fields valid | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC05 | Require first name | Negative | Backend available | POST signup without firstName | Other signup fields valid | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC06 | Require last name | Negative | Backend available | POST signup without lastName | Other signup fields valid | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC07 | Require password | Negative | Backend available | POST signup without password | Other signup fields valid | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC08 | Sign up the same user again | Negative | First signup succeeds | Repeat TC01 | Same username and valid fields | 4xx | A2: HTTP 000; initial signup failed to connect | Failed |
| TC09 | Sign in with correct credentials | Positive | User exists | POST signin | `qa.a.20261120@example.com` / `QaTest123!` | 200 and token | A4: HTTP 000; no token captured | Failed |
| TC10 | Reject incorrect password | Negative | User exists | POST signin | `qa.a.20261120@example.com` / `WrongPass123!` | 401/403 | A5: HTTP 000; curl exit 7 | Failed |
| TC11 | Reject unknown username | Negative | Backend available | POST signin | Unknown email and valid-format password | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC12 | Reject missing signin fields | Negative | Backend available | POST signin | `{}` | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC13 | Reject missing signin password | Negative | Backend available | POST signin | Known email, no password | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC14 | Read balance with valid token | Permission | User and valid token exist | GET account balance with bearer token | Token from signin | 200 | A6: HTTP 000; no valid token available | Failed |
| TC15 | Deny balance access without token | Permission | Backend available | GET account balance without Authorization | No token | 401/403 | A7: HTTP 000; curl exit 7 | Failed |
| TC16 | Deny balance access with malformed token | Permission | Backend available | GET account balance with bearer token | `invalid-token` | 401/403 | Not run in P2 | Not run |
| TC17 | Deny balance access for an unknown user | Permission | Backend available | GET balance with signed token for absent user | Unknown user token | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC18 | Search users with authorization | Positive | User data and valid token exist | GET user bulk search | Filter `QA`; bearer token | 200 | A8: HTTP 000; no valid token available | Failed |
| TC19 | Transfer a valid amount | Positive | Sender, recipient, and valid token exist | POST transfer | Amount `100`; recipient `507f1f77bcf86cd799439011` | 200 | A9: HTTP 000; no valid token or recipient account available | Failed |
| TC20 | Deny transfer without token | Permission | Backend available | POST transfer without Authorization | Amount `100`; recipient `507f1f77bcf86cd799439011` | 401/403 | A10: HTTP 000; curl exit 7 | Failed |
| TC21 | Reject negative transfer amount | Boundary | Sender, recipient, and valid token exist | POST transfer | Amount `-1` | 4xx | A11: HTTP 000; prerequisites unavailable | Failed |
| TC22 | Reject amount greater than balance | Negative | Sender balance known; recipient exists | POST transfer | Amount `999999999` | 4xx | A12: HTTP 000; no valid token or balance available | Failed |
| TC23 | Reject transfer to self | Negative | Sender identity and valid token known | POST transfer to sender's own user ID | Amount `1`; recipient equals sender ID | 4xx | A13: HTTP 000; self identity could not be established | Failed |
| TC24 | Exercise zero-amount boundary | Boundary | Sender, recipient, and valid token exist | POST transfer | Amount `0` | Not specified in P2; confirm whether zero is allowed | A14: HTTP 000; request sent with amount 0 | Failed |
| TC25 | Transfer the exact balance | Boundary | Sender balance known; recipient exists | POST transfer for the sender's full balance | Exact observed balance | 200 | A14 did not send a known balance; no response | Not executed as exact-balance case |
| TC26 | Reject balance plus one | Boundary | Sender balance known; recipient exists | POST transfer for balance + 1 | Exact observed balance + 1 | 4xx | A15 used `1000000000`, not a known balance + 1; no response | Not executed as balance-plus-one case |
| TC27 | Reject transfer with missing amount | Negative | Backend available | POST transfer without amount | Recipient ID provided | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC28 | Reject transfer with missing recipient | Negative | Backend available | POST transfer without `to` | Positive amount | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC29 | Reject invalid recipient ID | Negative | Sender and valid token exist | POST transfer | Positive amount; malformed recipient ID | 4xx; specific status not established in P2 | Not run in P2 | Not run |
| TC30 | Reject non-numeric transfer amount | Negative | Sender, recipient, and valid token exist | POST transfer | Amount `"100"` as a string | 4xx; specific status not established in P2 | Not run in P2 | Not run |

Every P2 HTTP attempt returned curl exit 7 with `HTTP 000`; the literal output and request details are in [results.md](./results.md).

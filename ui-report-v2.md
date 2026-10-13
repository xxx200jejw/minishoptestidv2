# UI test report v2 – MiniShop
Team: Timur Glebov · Repo: xxx200jejw/minishoptestidv2 · Branch: ui-tests · CI run: pending push

## 1. Maintenance (v1 → v2)
Tests red after v2: 7 of 10
Real defects among them: 0
Lines changed in shop.page.ts: 2
in tests: 3

## 2. New scenarios and results
| ID | REQ | Result before fix | Defect |
|---|---|---|---|
| UI-11 | REQ-UI-08 | PASS | – |
| UI-12 | REQ-UI-08 | FAIL | D-01 |
| UI-13 | REQ-UI-09 | PASS | – |
| UI-14 | REQ-UI-09 | FAIL | D-02 |
| UI-15 | REQ-UI-10 | PASS | – |
| UI-16 | REQ-UI-10 | FAIL | D-03 |
| UI-17 | REQ-UI-11 | PASS | – |
| UI-18 | REQ-UI-06 | PASS | – |

## 3. Flaky test
Runs before fix: not recorded
Cause: fixed sleep + single `isVisible()` check
Fix: web-first assertions with `toBeVisible()` / `toContainText()`
After: 0/5 failed (five consecutive runs passed)

## 4. Defects
| ID | Where (shop.js) | Expected | Actual | Fixed in commit |
|---|---|---|---|---|
| D-01 | sortProducts() | Price sorting should compare numeric values | Values were compared as strings, so order was wrong | this commit |
| D-02 | renderCart() / change handler | Quantity must be at least 1 and 0 should be rejected | Zero quantity was accepted | this commit |
| D-03 | renderCart() | SAVE10 should discount the whole basket subtotal | Discount was calculated from only the first cart item | this commit |

## 5. Mobile
Desktop (ui): 22/22 passed. Mobile (Pixel 7): 22/22 passed; same result, no differences observed.

## 6. CI
Workflow: `.github/workflows/ui-tests.yml`
First run: pending push
After fixes: local UI suites passed; CI result pending
Report artifact: configured (Playwright HTML report)

## 7. What we would do next
- Tag the five fastest smoke tests and run only those on every push.
- Keep the flaky confirmation check as a web-first assertion (`toBeVisible` / `toContainText`) instead of a timeout.
- Add a small visual regression check with `toHaveScreenshot()` for the basket and checkout states.
- Run the mobile project in the PR gate as well as desktop for cross-device confidence.

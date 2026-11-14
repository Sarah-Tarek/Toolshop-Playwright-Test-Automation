# Toolshop Playwright Test Automation

## Project Overview
This project focuses on Software Test Automation, covering UI and end-to-end testing of the [Practice Software Testing – Toolshop Demo](https://practicesoftwaretesting.com/) website using **Playwright and JavaScript**. The project follows the **Page Object Model (POM)** design pattern to organize test cases, locators, actions, assertions, and test data.

## Project Structure

The project follows the **Page Object Model (POM)** design pattern, separating page interactions, automated test cases, and test data for better maintainability and reusability.

- **`data/`:** Contains **test data** in external JSON files to avoid hard-coded values and improve maintainability.
- **`pages/`:** Contains **locators, actions, and assertions** for each page, ensuring reusable interactions and validations.
- **`tests/`:** Contains **automated test cases** for UI testing (TC-01 to TC-06) and end-to-end testing (TC-07).

```text
Playwright Project/
│
├── .github/
│
├── data/
│   ├── cart.json
│   ├── checkout.json
│   ├── login.json
│   ├── purchase-journey.json
│   ├── registration.json
│   └── search.json
│
├── pages/
│   ├── AccountPage.js
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   ├── InvoicesPage.js
│   ├── LoginPage.js
│   ├── NavBarPage.js
│   ├── ProductPage.js
│   └── RegisterPage.js
│
├── tests/
│   ├── e2e/
│   │   └── purchase-journey.spec.js
│   │
│   └── ui/
│       ├── cart.spec.js
│       ├── checkout.spec.js
│       ├── login.spec.js
│       ├── registration.spec.js
│       └── search.spec.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── playwright.config.js
```

## Automated Test Cases

| Test Case ID | Spec File | Description |
|:---:|---|---|
| **TC-01** | `registration.spec.js` | Register a new customer using a dynamically generated email and validate registration |
| **TC-02** | `login.spec.js` | Log in with valid credentials and verify successful authentication |
| **TC-03** | `search.spec.js` | Search for Thor Hammer and verify search results |
| **TC-04** | `cart.spec.js` | Add Thor Hammer to the cart and verify product details, success message, and cart badge |
| **TC-05** | `cart.spec.js` | Verify cart contents, product quantity, unit price, line total, and cart total |
| **TC-06** | `checkout.spec.js` | Verify checkout steps, billing information, payment confirmation, and generated invoice |
| **TC-07** | `purchase-journey.spec.js` | Complete the end-to-end purchase journey, including registration, login, product search, cart, checkout, payment, and invoice verification using `test.step()` |

## Running the Tests

Run all tests:

```bash
npm run test
```

Run all tests in a visible browser:

```bash
npm run test:headed
```

Run only the end-to-end purchase journey (TC-07):

```bash
npm run test:e2e
```

Open the Playwright HTML report:

```bash
npm run report
```

Run all tests and generate an Allure report:

```bash
npm run test:allure
```

## Test Execution Results

The following screenshots demonstrate the successful execution of each test case individually, as well as the successful execution of all automated tests in parallel.

### All Test Cases Passed

**Allure Report**

   ![](Pass%20Images/tcs-allure.png)

**HTML Report**

   ![](Pass%20Images/tcs.png)

### TC-01 — Registration

   ![](Pass%20Images/tc1.PNG)

### TC-02 — Login

   ![](Pass%20Images/tc2.PNG)

### TC-03 — Search for Thor Hammer Product

   ![](Pass%20Images/tc3.PNG)

### TC-04 — Open Thor Hammer and Add it to Cart

   ![](Pass%20Images/tc4.PNG)

### TC-05 — Open Cart

   ![](Pass%20Images/tc5.PNG)

### TC-06 — Checkout, Payment, and Invoice

   ![](Pass%20Images/tc6.PNG)
   
### TC-07 — Full End-to-End Purchase Journey

   ![](Pass%20Images/tc7.PNG)

## Conclusion

This project shows how automated testing can help verify different website functionalities and complete user workflows. Organizing the code using POM makes the tests easier to maintain and reuse, while running tests individually and in parallel helps check their reliability.

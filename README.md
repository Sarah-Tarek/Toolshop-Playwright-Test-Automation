# Toolshop Playwright Test Automation

## Project Overview
This project focuses on Software Test Automation, covering UI and end-to-end testing of the [Practice Software Testing – Toolshop Demo](https://practicesoftwaretesting.com/) website using **Playwright and JavaScript**. The project follows the **Page Object Model (POM)** design pattern to organize test cases, locators, actions, assertions, and test data.

## Automated Test Scenarios
- **Registration:** Valid customer registration using dynamically generated emails and form validation.
- **Login:** Valid login and negative login scenarios.
- **Search:** Search for Thor Hammer product and verify search results.
- **Cart:** Add Thor Hammer to the cart and verify product details, quantity, and pricing.
- **Checkout:** Verify checkout steps, billing information, payment, and order confirmation.
- **Invoices:** Verify the generated invoice number in the customer's account.
- **End-to-End Purchase Journey:** Complete registration, login, search for product, add to cart, checkout, payment, and invoice verification using `test.step()`.

## Running the Tests

Run all tests:

```bash
npx playwright test
```

## Test Execution Results

The following screenshots demonstrate the successful execution of each test suite individually, as well as the successful execution of all automated tests in parallel.

### 1. All Tests Passed

   ![](Pass%20Images/ALL%20PASS.png)

### 2. Registration Tests

   ![](Pass%20Images/register%20pass.PNG)

### 3. Login Tests

   ![](Pass%20Images/login%20pass.PNG)

### 4. Search for Thor Hammer Test

   ![](Pass%20Images/search%20pass.PNG)

### 5. Add Thor Hammer to Cart Test

   ![](Pass%20Images/cart%20pass.PNG)

### 6. Checkout, Pay, and Invoices Test

   ![](Pass%20Images/checkout%20pass.PNG)

### 7. Full Purchase Journey Test

   ![](Pass%20Images/journey%20pass.PNG)

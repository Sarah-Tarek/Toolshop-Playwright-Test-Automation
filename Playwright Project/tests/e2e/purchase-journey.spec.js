const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { NavBarPage } = require("../../pages/NavBarPage.js");
const { ProductPage } = require("../../pages/ProductPage.js");
const { CheckoutPage } = require("../../pages/CheckoutPage.js");
const { InvoicesPage } = require("../../pages/InvoicesPage.js");
const journeyData = require("../../data/purchase-journey.json");

test.describe("full purchase journey", () => {
    test("TC-07", async ({page}, testInfo) => {
        // test.slow();

        const timestamp = Date.now();
        const email = `stmb${timestamp}w${testInfo.workerIndex}@gmail.com`;

        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const navBarPage = new NavBarPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        const invoicesPage = new InvoicesPage(page);
        
        let searchProductDetails;
        let productDetails;
        let invoiceNumber;

        await test.step("1. Register", async () => {
            // Register
            await registerPage.open();
            await registerPage.fillRegisterForm(
                journeyData.registration, email
            );
            await registerPage.expectFieldsFilled(
                journeyData.registration, email
            );
            await registerPage.clickRegisterButton();
            await registerPage.expectRegistered(journeyData.registration);
        });

        await test.step("2. Login", async () => {
            // Login
            // await loginPage.open();
            await loginPage.fillLoginForm(
                email,
                journeyData.registration.password
            );
            await loginPage.clickLoginButton();
            await loginPage.expectLoggedIn(journeyData.login);
        });

        await test.step("3. Search for Thor Hammer", async () => {
            // Home page - Search for Thor Hammer
            await navBarPage.clickHome();
            await homePage.fillSearch(journeyData.search);
            await homePage.clickSearchButton();
            await homePage.expectSearch(journeyData.search);
            searchProductDetails = await homePage.getSearchProductDetails();
            await homePage.clickProductCard();
        });

        await test.step("4. Add Thor Hammer to cart", async () => {

            // Product page - Add Thor Hammer to cart and open cart
            productDetails = await productPage.getProductDetails();
            await productPage.expectProductName(searchProductDetails.name);
            await productPage.expectProductPrice(searchProductDetails.price);
            await productPage.clickAddToCartButton();
            await productPage.expectAddToCart(journeyData.cart.addToCartSuccessMsg);
            await productPage.expectCartBadge(journeyData.cart.cartBadge);
            await productPage.clickCartButton();
        });

        await test.step("5. Checkout", async () => {
            // Checkout page 1
            await checkoutPage.expectCheckout(journeyData.checkout.page1);
            await checkoutPage.expectProductName(productDetails.name);
            await checkoutPage.expectProductPrice(productDetails.price);
            await checkoutPage.expectProductQuantity(productDetails.quantity);
            await checkoutPage.expectProductTotalPrice();
            await checkoutPage.clickCheckoutButton1();

            // Checkout page 2
            await checkoutPage.expectAlreadyLoggedInMsg(journeyData.checkout.page2);
            await checkoutPage.clickCheckoutButton2();

            // Checkout page 3
            await checkoutPage.fillHouseNumber(journeyData.registration);
            await checkoutPage.expectFieldsFilled(journeyData.registration);
            await checkoutPage.clickCheckoutButton3();
        });

        await test.step("6. Pay", async () => {
            // Checkout page 4
            await checkoutPage.selectPaymentMethod(journeyData.checkout.page4.paymentMethod);
            await checkoutPage.clickCheckoutButton4();
            await checkoutPage.expectPaymentSuccessMsg(journeyData.checkout.page4.paymentSuccessMsg);
            await checkoutPage.clickCheckoutButton4();
            await checkoutPage.expectInvoiceNumber();
            await checkoutPage.expectOrderConfirmation(journeyData.checkout.page4.orderConfirmationMsg);
            invoiceNumber = await checkoutPage.getInvoiceNumber();
        });

        await test.step("7. Invoices", async () => {
            // Invoices page
            await navBarPage.clickMenu();
            await navBarPage.clickMyInvoices();
            await invoicesPage.expectInvoices(journeyData.checkout.invoicesData);
            await invoicesPage.expectInvoiceNumber(invoiceNumber.invoiceNum);

        });
    });
});
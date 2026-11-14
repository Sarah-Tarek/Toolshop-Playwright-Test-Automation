const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { NavBarPage } = require("../../pages/NavBarPage.js");
const { ProductPage } = require("../../pages/ProductPage.js");
const { CheckoutPage } = require("../../pages/CheckoutPage.js");
const { InvoicesPage } = require("../../pages/InvoicesPage.js");
const registrationData = require("../../data/registration.json");
const loginData = require("../../data/login.json");
const searchData = require("../../data/search.json");
const checkoutData = require("../../data/checkout.json");

test.describe("checkout", () => {

    let registerPage;
    let loginPage;
    let email;
    let productPage;
    let homePage;
    let navBarPage;
    let productDetails;

    test.beforeEach(async ({page}, testInfo) => {
        // Register
        registerPage = new RegisterPage(page);
        const timestamp = Date.now();
        email = `stmb${timestamp}w${testInfo.workerIndex}@gmail.com`;


        await registerPage.open();
        await registerPage.fillRegisterForm(
            registrationData.validRegistration, email
        );
        await registerPage.clickRegisterButton();
        await registerPage.expectRegistered(registrationData.validRegistration);

        // Login
        loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.fillLoginForm(
            email,
            registrationData.validRegistration.password
        );
        await loginPage.clickLoginButton();
        await loginPage.expectLoggedIn(loginData.validLogin);

        // Home page - Search for Thor Hammer
        homePage = new HomePage(page);
        navBarPage = new NavBarPage(page);
        await navBarPage.clickHome();
        await homePage.fillSearch(searchData);
        await homePage.clickSearchButton();
        await homePage.clickProductCard();

        // Product page - Add Thor Hammer to cart
        productPage = new ProductPage(page);
        productDetails = await productPage.getProductDetails();
        await productPage.clickAddToCartButton();

    });
    
    test("Checkout and Invoices", async ({page}) => {
        // test.slow();

        // Product page - Open cart
        await productPage.clickCartButton();
        
        // Checkout page 1
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.expectCheckout(checkoutData.page1);

        await checkoutPage.expectProductName(productDetails.name);
        await checkoutPage.expectProductPrice(productDetails.price);
        await checkoutPage.expectProductQuantity(productDetails.quantity);
        await checkoutPage.expectProductTotalPrice();

        await checkoutPage.clickCheckoutButton1();

        // Checkout page 2
        await checkoutPage.expectAlreadyLoggedInMsg(checkoutData.page2);
        await checkoutPage.clickCheckoutButton2();

        // Checkout page 3
        await checkoutPage.fillHouseNumber(registrationData.validRegistration);
        await checkoutPage.expectFieldsFilled(registrationData.validRegistration);
        await checkoutPage.clickCheckoutButton3();

        // Checkout page 4
        await checkoutPage.selectPaymentMethod(checkoutData.page4.paymentMethod);
        await checkoutPage.clickCheckoutButton4();
        await checkoutPage.expectPaymentSuccessMsg(checkoutData.page4.paymentSuccessMsg);
        await checkoutPage.clickCheckoutButton4();
        await checkoutPage.expectOrderConfirmation(checkoutData.page4.orderConfirmationMsg);
        const invoiceNumber = await checkoutPage.getInvoiceNumber();

        // Invoices page
        const invoicesPage = new InvoicesPage(page);
        await navBarPage.clickMenu();
        await navBarPage.clickMyInvoices();
        await invoicesPage.expectInvoices(checkoutData.invoicesData);
        await invoicesPage.expectInvoiceNumber(invoiceNumber.invoiceNum);

    });
});
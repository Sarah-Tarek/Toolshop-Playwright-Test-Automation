const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { NavBarPage } = require("../../pages/NavBarPage.js");
const { ProductPage } = require("../../pages/ProductPage.js");
const { CheckoutPage } = require("../../pages/CheckoutPage.js");
const registrationData = require("../../data/registration.json");
const loginData = require("../../data/login.json");
const searchData = require("../../data/search.json");
const cartData = require("../../data/cart.json");
const checkoutData = require("../../data/checkout.json");

test.describe("cart 1", () => {

    let registerPage;
    let loginPage;
    let email;

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
    });

    test("TC-04", async ({page}) => {
        
        // Home page - Search for Thor Hammer
        const homePage = new HomePage(page);
        const navBarPage = new NavBarPage(page);

        await navBarPage.clickHome();
        await homePage.fillSearch(searchData);
        await homePage.clickSearchButton();
        await homePage.expectSearch(searchData);

        const productDetails = await homePage.getSearchProductDetails();
        await homePage.clickProductCard();

        // Product page - Add Thor Hammer to cart
        const productPage = new ProductPage(page);
        await productPage.expectProductName(productDetails.name);
        await productPage.expectProductPrice(productDetails.price);
        await productPage.clickAddToCartButton();
        await productPage.expectAddToCart(cartData.addToCart.addToCartSuccessMsg);
        await productPage.expectCartBadge(cartData.addToCart.cartBadge);
    });

});

test.describe("cart 2", () => {

    let registerPage;
    let loginPage;
    let email;
    let homePage;
    let navBarPage;
    let productPage;
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
        await productPage.clickAddToCartButton();
        productDetails = await productPage.getProductDetails();
    });

    test("TC-05", async ({page}) => {
        // Product page - Open cart
        await productPage.clickCartButton();
        
        // Checkout page 1
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.expectCheckout(checkoutData.page1);

        await checkoutPage.expectProductName(productDetails.name);
        await checkoutPage.expectProductPrice(productDetails.price);
        await checkoutPage.expectProductQuantity(productDetails.quantity);
        await checkoutPage.expectProductTotalPrice();
    });

});
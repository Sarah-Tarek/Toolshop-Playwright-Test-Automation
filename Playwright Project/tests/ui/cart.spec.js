const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { NavBarPage } = require("../../pages/NavBarPage.js");
const { ProductPage } = require("../../pages/ProductPage.js");
const registrationData = require("../../data/registration.json");
const searchData = require("../../data/search.json");
const cartData = require("../../data/cart.json");

test.describe("cart", () => {

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

        // Login
        loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.fillLoginForm(
            email,
            registrationData.validRegistration.password
        );
        await loginPage.clickLoginButton();
    });

    test("Add Thor Hammer to cart", async ({page}) => {
        
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
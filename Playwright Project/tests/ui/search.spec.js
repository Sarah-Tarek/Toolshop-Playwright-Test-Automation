const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { NavBarPage } = require("../../pages/NavBarPage.js");
const registrationData = require("../../data/registration.json");
const loginData = require("../../data/login.json");
const searchData = require("../../data/search.json");

test.describe("search", () => {

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

    test("TC-03", async ({page}) => {
        const homePage = new HomePage(page);
        const navBarPage = new NavBarPage(page);

        await navBarPage.clickHome();
        await homePage.fillSearch(searchData);
        await homePage.clickSearchButton();
        await homePage.expectSearch(searchData);

    });

});
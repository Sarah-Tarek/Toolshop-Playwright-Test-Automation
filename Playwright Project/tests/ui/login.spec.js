const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const registrationData = require("../../data/registration.json");
const loginData = require("../../data/login.json");

test.describe("login", () => {

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

        // Open login page
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test("TC-02", async () => {
        await loginPage.fillLoginForm(
            email,
            registrationData.validRegistration.password
        );
        await loginPage.clickLoginButton();
        await loginPage.expectLoggedIn(loginData.validLogin);
    });

});
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

        // Open login page
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test("Valid login", async () => {
        await loginPage.fillLoginForm(
            email,
            registrationData.validRegistration.password
        );
        await loginPage.clickLoginButton();
        await loginPage.expectLoggedIn(loginData.validLogin);
    });

    test("Empty login", async () => {
        await loginPage.clickLoginButton();
        await loginPage.expectEmptyLogin(loginData.emptyLogin);
    });

    test("Empty email only", async () => {
        await loginPage.fillPasswordField(registrationData.validRegistration.password);
        await loginPage.clickLoginButton();
        await loginPage.expectEmptyEmail(loginData.emptyLogin);
    });

    test("Empty password only", async () => {
        await loginPage.fillEmailField(email);
        await loginPage.clickLoginButton();
        await loginPage.expectEmptyPassword(loginData.emptyLogin);
    });

    test("Invalid email and password", async () => {
        await loginPage.fillLoginForm(
            loginData.wrongLogin.wrongEmail,
            loginData.wrongLogin.wrongPassword
        );
        await loginPage.clickLoginButton();
        await loginPage.expectWrongLogin(loginData.wrongLogin);
    });

    test("Invalid email format", async () => {
        await loginPage.fillLoginForm(
            loginData.wrongEmailFormat.wrongEmail,
            loginData.wrongEmailFormat.wrongPassword
        );
        await loginPage.clickLoginButton();
        await loginPage.expectWrongEmailFormat(loginData.wrongEmailFormat);
    });

});
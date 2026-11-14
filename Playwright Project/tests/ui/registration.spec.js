const { test } = require("@playwright/test");
const { RegisterPage } = require("../../pages/RegisterPage.js");
const registrationData = require("../../data/registration.json");

test.describe("register", () => {
    
    test("TC-01", async ({ page }, testInfo) => {
        const registerPage = new RegisterPage(page);

        const timestamp = Date.now();
        const email = `stmb${timestamp}w${testInfo.workerIndex}@gmail.com`;


        await registerPage.open();
        await registerPage.fillRegisterForm(
            registrationData.validRegistration, email
        );
        await registerPage.expectFieldsFilled(
            registrationData.validRegistration, email
        );

        await registerPage.clickRegisterButton();
        await registerPage.expectRegistered(registrationData.validRegistration);
    });
});

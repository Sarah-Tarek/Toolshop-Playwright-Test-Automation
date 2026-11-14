const { expect } = require("@playwright/test");

class LoginPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.emailInputField = page.getByTestId("email");
        this.passwordInputField = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-submit");

        this.title = page.getByTestId("page-title");

        this.emailErrorMsg = page.getByTestId("email-error");
        this.passwordErrorMsg = page.getByTestId("password-error");

        this.invalidEmailOrPassword = page.getByTestId("login-error");
    }

    // Actions
    async open(){
        await this.page.goto("/auth/login")
    }

    async fillEmailField(email) {
        await this.emailInputField.fill(email);
    }

    async fillPasswordField(password) {
        await this.passwordInputField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async fillLoginForm(email, password) {
        await this.fillEmailField(email);
        await this.fillPasswordField(password);
    }

    // Assertions
    async expectLoggedIn(validLoginData) {
        await expect(this.page).toHaveURL(validLoginData.path);
        await expect(this.title).toHaveText(validLoginData.title);
    }

    async expectEmptyEmail(emptyLoginData) {
        await expect(this.page).toHaveURL(emptyLoginData.path);
        await expect(this.emailErrorMsg).toHaveText(emptyLoginData.emailErrorMsg);
    }

    async expectEmptyPassword(emptyLoginData) {
        await expect(this.page).toHaveURL(emptyLoginData.path);
        await expect(this.passwordErrorMsg).toHaveText(emptyLoginData.passwordErrorMsg);
    }

    async expectEmptyLogin(emptyLoginData) {
        await this.expectEmptyEmail(emptyLoginData);
        await this.expectEmptyPassword(emptyLoginData);
    }

    async expectWrongLogin(wrongLoginData) {
        await expect(this.page).toHaveURL(wrongLoginData.path);
        await expect(this.invalidEmailOrPassword).toHaveText(wrongLoginData.errorMessage);
    }

    async expectWrongEmailFormat(wrongEmailFormatData) {
        await expect(this.page).toHaveURL(wrongEmailFormatData.path);
        await expect(this.emailErrorMsg).toHaveText(wrongEmailFormatData.errorMessage);
    }

}

module.exports = { LoginPage };
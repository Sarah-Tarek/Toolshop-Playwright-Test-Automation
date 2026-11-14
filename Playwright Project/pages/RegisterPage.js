const { expect } = require("@playwright/test");

class RegisterPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.firstNameInputField = page.getByTestId("first-name");
        this.lastNameInputField = page.getByTestId("last-name");
        this.dobInputField = page.getByTestId("dob");
        this.countryDropdown = page.getByTestId("country");
        this.postalCodeInputField = page.getByTestId("postal_code");
        this.houseNumberInputField = page.getByTestId("house_number");
        this.streetInputField = page.getByTestId("street");
        this.cityInputField = page.getByTestId("city");
        this.stateInputField = page.getByTestId("state");
        this.phoneInputField = page.getByTestId("phone");
        this.emailInputField = page.getByTestId("email");
        this.passwordInputField = page.getByTestId("password");

        this.registerButton = page.getByTestId("register-submit");

        this.firstNameErrorMsg = page.getByTestId("first-name-error");
        this.lastNameErrorMsg = page.getByTestId("last-name-error");
        this.dobErrorMsg = page.getByTestId("dob-error");
        this.countryErrorMsg = page.getByTestId("country-error");
        this.postalCodeErrorMsg = page.getByTestId("postal_code-error");
        this.houseNumberErrorMsg = page.getByTestId("house_number-error");
        this.streetErrorMsg = page.getByTestId("street-error");
        this.cityErrorMsg = page.getByTestId("city-error");
        this.stateErrorMsg = page.getByTestId("state-error");
        this.phoneErrorMsg = page.getByTestId("phone-error");
        this.emailErrorMsg = page.getByTestId("email-error");
        this.passwordErrorMsg = page.getByTestId("password-error");
    }

    // Actions
    async open(){
        await this.page.goto("/auth/register")
    }

    async fillFirstNameInputField(firstName){
        await this.firstNameInputField.fill(firstName);
    }

    async fillLastNameInputField(lastName){
        await this.lastNameInputField.fill(lastName);
    }

    async fillDobInputField(dob) {
        await this.dobInputField.fill(dob);
    }

    async selectCountry(country) {
        await this.countryDropdown.selectOption({label: country});
    }

    async fillPostalCodeInputField(postalCode) {
        await this.postalCodeInputField.fill(postalCode);
    }

    async fillHouseNumberInputField(houseNumber) {
        await this.houseNumberInputField.fill(houseNumber);
    }

    async fillStreetInputField(street) {
        await this.streetInputField.fill(street);
    }

    async fillCityInputField(city) {
        await this.cityInputField.fill(city);
    }

    async fillStateInputField(state) {
        await this.stateInputField.fill(state);
    }

    async fillPhoneInputField(phone) {
        await this.phoneInputField.fill(phone);
    }

    async fillEmailInputField(email) {
        await this.emailInputField.fill(email);
    }

    async fillPasswordInputField(password) {
        await this.passwordInputField.fill(password);
    }

    // async fillPasswordInputField(password) {
    //     await this.passwordInputField.fill(password);
    //     await this.passwordInputField.press("Backspace");
    //     await this.passwordInputField.pressSequentially(password.slice(-1));
    // }


    // async fillPasswordInputField(password) {
    //     await this.passwordInputField.fill(password);
        // await this.emailInputField.click();
        // await this.passwordInputField.click();
        // await this.passwordInputField.press("End");
        // await this.passwordInputField.press("Backspace");
        // await this.passwordInputField.pressSequentially(password.slice(-1));
    // }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async fillRegisterForm(validRegistrationData, email) {
        await this.fillFirstNameInputField(validRegistrationData.firstName);
        await this.fillLastNameInputField(validRegistrationData.lastName);
        await this.fillDobInputField(validRegistrationData.dateOfBirth);
        await this.selectCountry(validRegistrationData.country);
        await this.fillPostalCodeInputField(validRegistrationData.postalCode);
        await this.fillHouseNumberInputField(validRegistrationData.houseNumber);
        await this.fillStreetInputField(validRegistrationData.street);
        await this.fillCityInputField(validRegistrationData.city);
        await this.fillStateInputField(validRegistrationData.state);
        await this.fillPhoneInputField(validRegistrationData.phone);
        await this.fillEmailInputField(email);
        await this.fillPasswordInputField(validRegistrationData.password);
    }
    
    async expectFieldsFilled(validRegistrationData, email) {
        await expect(this.firstNameInputField).toHaveValue(validRegistrationData.firstName);
        await expect(this.lastNameInputField).toHaveValue(validRegistrationData.lastName);
        await expect(this.dobInputField).toHaveValue(validRegistrationData.dateOfBirth);
        // await expect(this.countryDropdown).toHaveValue(validRegistrationData.country);
        await expect(this.postalCodeInputField).toHaveValue(validRegistrationData.postalCode);
        await expect(this.houseNumberInputField).toHaveValue(validRegistrationData.houseNumber);
        await expect(this.streetInputField).toHaveValue(validRegistrationData.street);
        await expect(this.cityInputField).toHaveValue(validRegistrationData.city);
        await expect(this.stateInputField).toHaveValue(validRegistrationData.state);
        await expect(this.phoneInputField).toHaveValue(validRegistrationData.phone);
        await expect(this.emailInputField).toHaveValue(email);
        await expect(this.passwordInputField).toHaveValue(validRegistrationData.password);
    }

    // Assertions
    async expectRegistered(validRegistrationData) {
        await expect(this.page).toHaveURL(validRegistrationData.path);
    }

    async expectEmptyRegisteration(emptyRegistrationData) {
        await expect(this.page).toHaveURL(emptyRegistrationData.path);
        await expect(this.firstNameErrorMsg).toHaveText(emptyRegistrationData.firstNameErrorMsg);
        await expect(this.lastNameErrorMsg).toHaveText(emptyRegistrationData.lastNameErrorMsg);
        await expect(this.dobErrorMsg).toHaveText(emptyRegistrationData.dobErrorMsg);
        await expect(this.countryErrorMsg).toHaveText(emptyRegistrationData.countryErrorMsg);
        await expect(this.postalCodeErrorMsg).toHaveText(emptyRegistrationData.postalCodeErrorMsg);
        await expect(this.houseNumberErrorMsg).toHaveText(emptyRegistrationData.houseNumberErrorMsg);
        await expect(this.streetErrorMsg).toHaveText(emptyRegistrationData.streetErrorMsg);
        await expect(this.cityErrorMsg).toHaveText(emptyRegistrationData.cityErrorMsg);
        await expect(this.stateErrorMsg).toHaveText(emptyRegistrationData.stateErrorMsg);
        await expect(this.phoneErrorMsg).toHaveText(emptyRegistrationData.phoneErrorMsg);
        await expect(this.emailErrorMsg).toHaveText(emptyRegistrationData.emailErrorMsg);
        await expect(this.passwordErrorMsg).toHaveText(emptyRegistrationData.passwordErrorMsg);
    }

}

module.exports = { RegisterPage };
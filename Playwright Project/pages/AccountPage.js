const { expect } = require("@playwright/test");

class AccountPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.title = page.getByTestId("page-title");

        this.favorites = page.getByTestId("nav-favorites");
        this.profile = page.getByTestId("nav-profile");
        this.invoices = page.getByTestId("nav-invoices");
        this.messages = page.getByTestId("nav-messages");
    }

    // Actions
    async open(){
        await this.page.goto("/account")
    }

    async clickFavourites() {
        await this.favorites.click();
    }

    async clickProfile() {
        await this.profile.click();
    }

    async clickInvoices() {
        await this.invoices.click();
    }

    async clickMessages() {
        await this.messages.click();
    }

    // Assertions
    

}

module.exports = { AccountPage };
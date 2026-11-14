const { expect } = require("@playwright/test");

class NavBarPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.home = page.getByTestId("nav-home");
        this.menu = page.getByTestId("nav-menu");

        this.myAccount = page.getByTestId("nav-my-account");
        this.myFavorites = page.getByTestId("nav-my-favorites");
        this.myProfile = page.getByTestId("nav-my-profile");
        this.myInvoices = page.getByTestId("nav-my-invoices");
        this.signout = page.getByTestId("nav-sign-out");
    }

    // Actions

    async clickHome() {
        await this.home.click();
    }

    async clickMenu() {
        await this.menu.click();
    }

    async clickMyInvoices() {
        await this.myInvoices.click();
    }

    // Assertions
    

}

module.exports = { NavBarPage };
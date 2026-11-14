const { expect } = require("@playwright/test");

class InvoicesPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.invoicesTable = page.getByRole("table");
        this.invoiceRow = this.invoicesTable.locator("tbody tr");
        this.invoiceNumber = this.invoiceRow.getByRole("cell").first();
    }

    // Actions
    
    async open(){
        await this.page.goto("/account/invoices")
    }

    // Assertions

    async expectInvoices(invoicesData) {
        await expect(this.page).toHaveURL(invoicesData.path);
    }

    async expectInvoiceNumber(invoiceNumber) {
        await expect(this.invoiceNumber).toHaveText(invoiceNumber);
    }

}

module.exports = { InvoicesPage };
const { expect } = require("@playwright/test");

class HomePage {

    // Locators
    constructor(page) {
        this.page = page;

        this.search = page.getByTestId("search-query");
        this.searchCaption = page.getByTestId("search-caption");
        this.searchResult = page.getByTestId("search-result-count");

        this.searchButton = page.getByTestId("search-submit");

        this.productCard = page.locator("a.card").filter({
            has: page.getByRole("heading", {
                name: "Thor Hammer",
                exact: true
            })
        });
        this.productCardName = this.productCard.getByTestId("product-name");
        this.productCardPrice = this.productCard.getByTestId("product-price");
    }

    // Actions
    async open(){
        await this.page.goto("/")
    }

    async fillSearch(searchData) {
        await this.search.fill(searchData.product);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickProductCard() {
        await this.productCard.click();
    }

    async getSearchProductDetails() {
        return {
            name: await this.productCardName.innerText(),
            price: await this.productCardPrice.innerText()
        };
    }

    // Assertions

    async expectSearch(searchData) {
        await expect(this.searchCaption).toHaveText(searchData.caption);
        await expect(this.searchResult).toHaveText(searchData.result);
    }

}

module.exports = { HomePage };
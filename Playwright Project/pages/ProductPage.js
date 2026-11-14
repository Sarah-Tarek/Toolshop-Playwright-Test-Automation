const { expect } = require("@playwright/test");

class ProductPage {

    // Locators
    constructor(page) {
        this.page = page;

        this.productName = page.getByTestId("product-name");
        this.productPrice = page.locator("div.price-section span").filter({
            has: page.getByTestId("unit-price")
        });

        this.addToCart = page.getByTestId("add-to-cart");
        this.addToCartSuccessMsg = page.getByRole("alert");

        this.productQuantity = page.getByTestId("quantity");

        this.cartBadge = page.getByTestId("cart-quantity");
        this.cart = page.getByTestId("nav-cart");
    }

    // Actions

    async clickAddToCartButton() {
        await this.addToCart.click();
    }

    async clickCartButton() {
        await this.cart.click();
    }

    async getProductDetails() {
        return {
            name: await this.productName.innerText(),
            price: await this.productPrice.innerText(),
            quantity: await this.productQuantity.innerText()
        };
    }

    // Assertions

    async expectProductName(productName) {
        await expect(this.productName).toHaveText(productName);
    }

    async expectProductPrice(productPrice) {
        await expect(this.productPrice).toHaveText(productPrice);
    }

    async expectAddToCart(addToCartSuccessMsg) {
        await expect(this.addToCartSuccessMsg).toHaveText(addToCartSuccessMsg);
    }

    async expectCartBadge(cartBadge) {
        await expect(this.cartBadge).toHaveText(cartBadge);
    }

}

module.exports = { ProductPage };
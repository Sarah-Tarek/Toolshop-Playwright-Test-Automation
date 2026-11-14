const { expect } = require("@playwright/test");

class CheckoutPage {

    // Locators
    constructor(page) {
        this.page = page;

        // page 1
        this.productRowCart = page.getByRole("row").filter({
            has: page.getByTestId("product-title").getByText(
                "Thor Hammer",
                { exact: true }
            )
        });
        this.productName = this.productRowCart.getByTestId("product-title");
        this.productQuantity = this.productRowCart.getByTestId("product-quantity");
        this.productPrice = this.productRowCart.getByTestId("product-price");
        this.productTotalPrice = this.productRowCart.getByTestId("line-price");
        this.proceedButton1 = page.getByTestId("proceed-1");

        // page 2
        this.alreadyLoggedInMsg = page.getByRole("paragraph");
        this.proceedButton2 = page.getByTestId("proceed-2");

        // page 3
        this.country = page.getByTestId("country");
        this.postalCode = page.getByTestId("postal_code");
        this.houseNumber = page.getByTestId("house_number");
        this.street = page.getByTestId("street");
        this.city = page.getByTestId("city");
        this.state = page.getByTestId("state");
        this.proceedButton3 = page.getByTestId("proceed-3");

        // page 4
        this.paymentMethod = page.getByTestId("payment-method");
        this.proceedButton4 = page.getByTestId("finish");
        
        this.paymentSuccessMsg = page.getByTestId("payment-success-message");
        this.orderConfirmationMsg = page.locator("#order-confirmation");
        this.invoiceNumber = this.orderConfirmationMsg.locator("span");
    }

    /*** Actions ***/
    
    async open(){
        await this.page.goto("/checkout")
    }

    // page 1
    async clickCheckoutButton1(){
        await this.proceedButton1.click();
    }

    // page 2
    async clickCheckoutButton2(){
        await this.proceedButton2.click();
    }

    // page 3
    async clickCheckoutButton3(){
        await this.proceedButton3.click();
    }

    async fillHouseNumber(validRegistrationData){
        await this.houseNumber.fill(validRegistrationData.houseNumber);
    }

    // page 4
    async clickCheckoutButton4(){
        await this.proceedButton4.click();
    }

    async selectPaymentMethod(paymentMethod) {
        await this.paymentMethod.selectOption({label: paymentMethod.cash});
    }

    async getInvoiceNumber() {
        return {
            invoiceNum: await this.invoiceNumber.innerText()
        };
    }

    /*** Assertions ***/

    // page 1
    async expectCheckout(checkoutPage1Data) {
        await expect(this.page).toHaveURL(checkoutPage1Data.path);
    }

    async expectProductName(productName) {
        await expect(this.productName).toHaveText(productName);
    }

    async expectProductPrice(productPrice) {
        await expect(this.productPrice).toHaveText(productPrice);
    }

    async expectProductQuantity(productQuantity) {
        await expect(this.productQuantity).toHaveText(productQuantity);
    }

    async expectProductTotalPrice() {
        const price = Number(
            (await this.productPrice.innerText()).replace("$", "")
        );

        const quantity = Number(
            await this.productQuantity.inputValue()
        );

        const expectedTotal = price * quantity;

        await expect(this.productTotalPrice).toHaveText(
            `$${expectedTotal.toFixed(2)}`
        );
    }

    // page 2
    async expectAlreadyLoggedInMsg(checkoutPage2Data) {
        await expect(this.alreadyLoggedInMsg).toContainText(checkoutPage2Data.alreadyLoggedInMsg);
    }

    // page 3
    async expectFieldsFilled(validRegistrationData) {
        // await expect(this.country).toHaveValue(validRegistrationData.country);
        await expect(this.postalCode).toHaveValue(validRegistrationData.postalCode);
        await expect(this.houseNumber).toHaveValue(validRegistrationData.houseNumber);
        await expect(this.street).toHaveValue(validRegistrationData.street);
        await expect(this.city).toHaveValue(validRegistrationData.city);
        await expect(this.state).toHaveValue(validRegistrationData.state);
    }

    // page 4
    async expectPaymentSuccessMsg(paymentSuccessMsg) {
        await expect(this.paymentSuccessMsg).toHaveText(paymentSuccessMsg);
    }

    async expectOrderConfirmation(orderConfirmationMsg) {
        await expect(this.orderConfirmationMsg).toContainText(orderConfirmationMsg);
    }

}

module.exports = { CheckoutPage };
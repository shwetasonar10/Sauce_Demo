
import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly errorMessage: Locator;
    readonly checkoutProducts: Locator;
   
    constructor(page: Page) {
        this.page = page;
 
        this.cartButton = page.locator('.shopping_cart_link');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.errorMessage= page.locator('[data-test="error"]');
        this.checkoutProducts = page.locator('.cart_item');
    }

    async verifyCheckoutValidation() {
        await this.continueButton.click();
        await expect(this.errorMessage).toHaveText('Error: First Name is required');

        await this.firstNameInput.fill('Shweta');
        await this.continueButton.click();
        await expect(this.errorMessage).toHaveText('Error: Last Name is required');

        await this.lastNameInput.fill('Sonar');
        await this.continueButton.click();
        await expect(this.errorMessage).toHaveText('Error: Postal Code is required');
    }

    async enterCustomerDetails() {
        await this.firstNameInput.clear();
        await this.lastNameInput.clear();
        await this.firstNameInput.fill('Sonal');
        await this.lastNameInput.fill('Sonar');
        await this.postalCodeInput.fill('411058');
        await this.continueButton.click();
    }

    async verifyCheckoutProducts() {
        await expect(this.checkoutProducts.filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(this.checkoutProducts.filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
        await expect(this.checkoutProducts).toHaveCount(2);
    }


    async verifyOrderTotal() {
        const itemTotalText = await this.itemTotal.textContent(); // Get item total 
        const taxText = await this.tax.textContent(); // Get tax
        const totalText = await this.total.textContent(); // Get final total

        // Convert text into numbers and remove the currency symbol
        const itemTotal = Number(itemTotalText!.replace('Item total: $', ''));
        const tax = Number(taxText!.replace('Tax: $', ''));
        const actualTotal = Number(totalText!.replace('Total: $', ''));

        // Calculate expected total with tax and round to 2 Deciimal
        const expectedTotal = Number((itemTotal + tax).toFixed(2));

        expect(actualTotal).toBe(expectedTotal); //final total
    }

    async finishOrder() {
        await this.finishButton.click();
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    }

}
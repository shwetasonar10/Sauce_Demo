
import { Locator, Page, expect } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly removeButton: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.removeButton = page.locator('//button[@id="remove-sauce-labs-bike-light"]');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async verifyCartProducts() {
        await expect(this.cartItems.filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();

        await expect(this.cartItems.filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();

        await expect(this.cartItems).toHaveCount(2);
    }

    async removeOneItemFromCart() {
        await this.removeButton.click();
        await this.page.goBack(); 
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}


import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly products: Locator;
    readonly sortDropdown: Locator;
    readonly first_Product: Locator;
    readonly second_Product: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.inventory_item');
        this.sortDropdown = page.locator('.product_sort_container');
        this.first_Product = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.second_Product = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartCount = page.locator('.shopping_cart_badge');
    }


    async sortByPriceLowToHigh() {
        // Select Price Low to High
        await this.sortDropdown.selectOption('lohi');

        // Get all product prices
        const prices = await this.page.locator('.inventory_item_price').allTextContents();

        // Create an empty array
        let actualPrices = [];

        // Convert prices from string to number and remove $ 
        for (const price of prices) {
            actualPrices.push(Number(price.replace('$', '')));
        }

        const expectedPrices = [...actualPrices];
        expectedPrices.sort((a, b) => a - b);
        expect(actualPrices).toEqual(expectedPrices);
    }


    async sortByNameZToA() {
        await this.sortDropdown.selectOption('za');
        const productName = await this.page.locator('.inventory_item_name').allTextContents();

        // Create an empty array
        const actualNames = [];

        for (const name of productName) {
            actualNames.push(name.trim());
        }

        const expectedNames = [...actualNames];
        expectedNames.sort((a, b) => b.localeCompare(a));
        expect(actualNames).toEqual(expectedNames);
    }


    async addTwoProductsToCart() {
        await this.first_Product.click();
        await this.second_Product.click();
        await expect(this.cartCount).toHaveText('2');
    }

    async verifyBadgeCountUpdated() {
        await expect(this.cartCount).toHaveText('1');
    }

    async againAddOneMoreProductsToCart() {
        await this.second_Product.click();
        await expect(this.cartCount).toHaveText('2'); 
    }
}


import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.productsTitle = page.locator('.title');
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async emptyFields() {
        await this.loginButton.click();
    }


    async verifyLoginFailure_EmptyValues() {
        await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.productsTitle).toHaveText('Products');
    }

    async verifyLoginFailure_Locked() {
        await expect(this.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }
    
}
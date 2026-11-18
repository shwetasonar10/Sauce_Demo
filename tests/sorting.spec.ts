
import { test, expect } from '../fixtures/test';

test.describe('SauceDemo Product Sorting', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user','secret_sauce');
        await loginPage.verifyLoginSuccess();
    });


     test('Verify sorting by Price Low to High',{ tag: '@sanity' }, async ({ productsPage }) => {
        await productsPage.sortByPriceLowToHigh();
    });

    
    test('Verify sorting by Name Z to A',{ tag: '@sanity' }, async ({ productsPage }) => {
        await productsPage.sortByNameZToA();
    });

});
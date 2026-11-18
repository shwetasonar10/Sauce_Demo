
import { test, expect } from '../fixtures/test';

test.describe('SauceDemo Login', () => {

    test('Verify user login successfully', async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();
    });


    test('Verify locked_out_user sees the correct error', async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.verifyLoginFailure_Locked();
    });

    test('Verify empty credentials show error', async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.emptyFields();
        await loginPage.verifyLoginFailure_EmptyValues();
    });


    test('Verify sorting by Price Low to High', async ({ loginPage, productsPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();
        await productsPage.sortByPriceLowToHigh();
    });

    test('Verify sorting by Name Z to A', async ({ loginPage, productsPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();
        await productsPage.sortByNameZToA();
    });


    test('Verify End-to-End Checkout With Two Products', async ({ loginPage, checkoutPage, cartPage, productsPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();

        await productsPage.addTwoProductsToCart();
        await checkoutPage.cartButton.click();
        await cartPage.verifyCartProducts();
        await cartPage.removeOneItemFromCart();
        await productsPage.verifyBadgeCountUpdated();
        await productsPage.againAddOneMoreProductsToCart();
        await checkoutPage.cartButton.click();
        await cartPage.clickCheckout();
        await checkoutPage.verifyCheckoutValidation();
        await checkoutPage.enterCustomerDetails();
        await checkoutPage.verifyCheckoutProducts();
        await checkoutPage.verifyOrderTotal();
        await checkoutPage.finishOrder();
    });

});

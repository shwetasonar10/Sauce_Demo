
import { test } from '../fixtures/test';

test.describe('SauceDemo Checkout', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();
    });


    test('Verify End-to-End Checkout With Two Products',{ tag: '@regression' }, async ({ checkoutPage, cartPage, productsPage }) => {
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
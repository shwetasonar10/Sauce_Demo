import { test, expect } from '../fixtures/test';

test.describe('SauceDemo Login', () => {

    test('Verify user login successfully',{ tag: '@sanity' }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();
    });


    test('Verify locked_out_user sees the correct error', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.verifyLoginFailure_Locked();
    });

    test('Verify empty credentials show error', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.emptyFields();
        await loginPage.verifyLoginFailure_EmptyValues();
    });

});

import { test } from "../fixtures/accountFixture";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { SignupAndLoginPage } from "../pages/SignupAndLoginPage";
import { testData } from "../test-data/testData";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";

test.describe("Checkout Suite", () => {
  test("Test Case 14: Place Order: Register while Checkout", async function ({
    page,
    newUser,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await productPage.addProductToCartByHovering(0);
    await productPage.continueShopping();
    await productPage.addProductToCartByHovering(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectProductsInCart(testData.cartProducts);

    await cartPage.expectCartPageVisible();
    await cartPage.clickProceedToCheckout();
    await cartPage.expectRegistrationModalAndClickRegistration();
    await signupAndLoginPage.expectSignupPageVisible();
    await signupAndLoginPage.signup(newUser.email, newUser.name);
    await signupAndLoginPage.expectAccInfoHeaderVisible();
    await signupAndLoginPage.selectTitle(newUser.title);
    await signupAndLoginPage.expectTitleSelected(newUser.title);

    await signupAndLoginPage.expectNameAndEmailInAccInfoPage(
      newUser.name,
      newUser.email,
    );
    await signupAndLoginPage.inputPassword(newUser.password);
    await signupAndLoginPage.selectDateOfBirth(
      newUser.dateOfBirth.day,
      newUser.dateOfBirth.month,
      newUser.dateOfBirth.year,
    );

    await signupAndLoginPage.selectCheckboxes();
    await signupAndLoginPage.expectCheckboxesSelected();
    await signupAndLoginPage.fillAddressDetails(newUser);
    await signupAndLoginPage.createAccount();
    await signupAndLoginPage.expectAccountCreated();
    await signupAndLoginPage.clickContinueBtn();
    await signupAndLoginPage.expectNameisVisibleAfterSignup(newUser.name);
    await homePage.clickCart();
    await cartPage.expectProductsInCart(testData.cartProducts);
    await cartPage.clickProceedToCheckout();

    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectDeliveryAndBillingAddresses(newUser);
    await checkoutPage.expectReviewOrderVisible();
    await checkoutPage.expectProductsInOrder(testData.cartProducts);
    await checkoutPage.enterOrderComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageVisible();
    await paymentPage.fillPaymentDetails(testData.payment);
    await paymentPage.payAndConfirmOrder();
    await paymentPage.expectOrderPlacedSuccessfully();

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    newUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 15: Place Order: Register before Checkout", async function ({
    page,
    newUser,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickSignupLogin();
    await signupAndLoginPage.expectSignupPageVisible();
    await signupAndLoginPage.signup(newUser.email, newUser.name);
    await signupAndLoginPage.expectAccInfoHeaderVisible();
    await signupAndLoginPage.selectTitle(newUser.title);
    await signupAndLoginPage.expectTitleSelected(newUser.title);
    await signupAndLoginPage.expectNameAndEmailInAccInfoPage(
      newUser.name,
      newUser.email,
    );
    await signupAndLoginPage.inputPassword(newUser.password);
    await signupAndLoginPage.selectDateOfBirth(
      newUser.dateOfBirth.day,
      newUser.dateOfBirth.month,
      newUser.dateOfBirth.year,
    );
    await signupAndLoginPage.selectCheckboxes();
    await signupAndLoginPage.expectCheckboxesSelected();
    await signupAndLoginPage.fillAddressDetails(newUser);
    await signupAndLoginPage.createAccount();
    await signupAndLoginPage.expectAccountCreated();
    await signupAndLoginPage.clickContinueBtn();
    await signupAndLoginPage.expectNameisVisibleAfterSignup(newUser.name);

    await productPage.addProductToCartByHovering(0);
    await productPage.continueShopping();
    await productPage.addProductToCartByHovering(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);
    await cartPage.clickProceedToCheckout();

    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectDeliveryAndBillingAddresses(newUser);
    await checkoutPage.expectReviewOrderVisible();
    await checkoutPage.expectProductsInOrder(testData.cartProducts);
    await checkoutPage.enterOrderComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageVisible();
    await paymentPage.fillPaymentDetails(testData.payment);
    await paymentPage.payAndConfirmOrder();
    await paymentPage.expectOrderPlacedSuccessfully();

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    newUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 16: Place Order: Login before Checkout", async function ({
    page,
    registeredUser,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickSignupLogin();
    await signupAndLoginPage.expectLoginPageVisible();
    await signupAndLoginPage.login(
      registeredUser.email,
      registeredUser.password,
    );
    await signupAndLoginPage.expectUserIsLoggedIn(registeredUser.name);

    await productPage.addProductToCartByHovering(0);
    await productPage.continueShopping();
    await productPage.addProductToCartByHovering(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);
    await cartPage.clickProceedToCheckout();

    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectDeliveryAndBillingAddresses(registeredUser);
    await checkoutPage.expectReviewOrderVisible();
    await checkoutPage.expectProductsInOrder(testData.cartProducts);
    await checkoutPage.enterOrderComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageVisible();
    await paymentPage.fillPaymentDetails(testData.payment);
    await paymentPage.payAndConfirmOrder();
    await paymentPage.expectOrderPlacedSuccessfully();

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    registeredUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 23: Verify address details in checkout page", async function ({
    page,
    newUser,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectSignupPageVisible();
    await signupAndLoginPage.signup(newUser.email, newUser.name);
    await signupAndLoginPage.expectAccInfoHeaderVisible();
    await signupAndLoginPage.selectTitle(newUser.title);
    await signupAndLoginPage.expectTitleSelected(newUser.title);
    await signupAndLoginPage.expectNameAndEmailInAccInfoPage(
      newUser.name,
      newUser.email,
    );
    await signupAndLoginPage.inputPassword(newUser.password);
    await signupAndLoginPage.selectDateOfBirth(
      newUser.dateOfBirth.day,
      newUser.dateOfBirth.month,
      newUser.dateOfBirth.year,
    );
    await signupAndLoginPage.selectCheckboxes();
    await signupAndLoginPage.expectCheckboxesSelected();
    await signupAndLoginPage.fillAddressDetails(newUser);
    await signupAndLoginPage.createAccount();
    await signupAndLoginPage.expectAccountCreated();
    await signupAndLoginPage.clickContinueBtn();
    await signupAndLoginPage.expectNameisVisibleAfterSignup(newUser.name);

    await productPage.addProductToCart(0);
    await productPage.continueShopping();
    await productPage.addProductToCart(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);
    await cartPage.clickProceedToCheckout();

    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectDeliveryAddressMatches(newUser);
    await checkoutPage.expectBillingAddressMatches(newUser);

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    newUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 24: Download Invoice after purchase order", async function ({
    page,
    newUser,
  }, testInfo) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const invoicePath = testInfo.outputPath(testData.invoice.fileName);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await productPage.addProductToCart(0);
    await productPage.continueShopping();
    await productPage.addProductToCart(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);

    await cartPage.clickProceedToCheckout();
    await cartPage.expectRegistrationModalAndClickRegistration();
    await signupAndLoginPage.expectSignupPageVisible();
    await signupAndLoginPage.signup(newUser.email, newUser.name);
    await signupAndLoginPage.expectAccInfoHeaderVisible();
    await signupAndLoginPage.selectTitle(newUser.title);
    await signupAndLoginPage.expectTitleSelected(newUser.title);
    await signupAndLoginPage.expectNameAndEmailInAccInfoPage(
      newUser.name,
      newUser.email,
    );
    await signupAndLoginPage.inputPassword(newUser.password);
    await signupAndLoginPage.selectDateOfBirth(
      newUser.dateOfBirth.day,
      newUser.dateOfBirth.month,
      newUser.dateOfBirth.year,
    );
    await signupAndLoginPage.selectCheckboxes();
    await signupAndLoginPage.expectCheckboxesSelected();
    await signupAndLoginPage.fillAddressDetails(newUser);
    await signupAndLoginPage.createAccount();
    await signupAndLoginPage.expectAccountCreated();
    await signupAndLoginPage.clickContinueBtn();
    await signupAndLoginPage.expectNameisVisibleAfterSignup(newUser.name);

    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);
    await cartPage.clickProceedToCheckout();

    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectDeliveryAndBillingAddresses(newUser);
    await checkoutPage.expectReviewOrderVisible();
    await checkoutPage.expectProductsInOrder(testData.cartProducts);
    await checkoutPage.enterOrderComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();

    await paymentPage.expectPaymentPageVisible();
    await paymentPage.fillPaymentDetails(testData.payment);
    await paymentPage.payAndConfirmOrder();
    await paymentPage.expectOrderPlacedSuccessfully();
    await paymentPage.downloadAndVerifyInvoice(
      testData.invoice,
      invoicePath,
    );
    console.log(`Invoice saved at: ${invoicePath}`);
    await paymentPage.clickContinue();

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    newUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });
});

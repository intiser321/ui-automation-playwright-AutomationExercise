import { test } from "../fixtures/baseFixture";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { testData } from "../test-data/testData";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

test.describe("Cart Suite", () => {
  test("Test Case 12: Add Products in Cart", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();

    await productPage.addProductToCartByHovering(0);
    await productPage.continueShopping();
    await productPage.addProductToCartByHovering(1);
    await productPage.viewCart();

    await cartPage.expectProductsInCart(testData.cartProducts);
  });

  test("Test Case 13: Verify Product quantity in Cart", async function ({
    page,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await productPage.clickViewOnAnyproduct(testData.anyProduct.id);
    await productDetailsPage.expectProductDetailPageVisible(
      testData.anyProduct.id,
    );
    await productDetailsPage.setProductQuantity(testData.anyProduct.quantity);
    await productDetailsPage.clickAddToCartBtn();
    await productPage.viewCart();
    await cartPage.expectProductWithProperQuantity(testData.anyProduct);
  });
  test("Test Case 17: Remove Products From Cart", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await productPage.addProductToCartByHovering(0);
    await productPage.continueShopping();
    await productPage.addProductToCartByHovering(1);
    await productPage.continueShopping();
    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(testData.cartProducts);

    const productToRemove = testData.cartProducts[0];
    const remainingProduct = testData.cartProducts[1];

    await cartPage.removeProductFromCart(productToRemove.id);
    await cartPage.expectProductRemoved(productToRemove.id);
    await cartPage.expectProductsInCart([remainingProduct]);
  });
});

import { test } from "../fixtures/accountFixture";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductsPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CategoryPage } from "../pages/CategoryPage";
import { BrandPage } from "../pages/BrandPage";
import { CartPage } from "../pages/CartPage";
import { SignupAndLoginPage } from "../pages/SignupAndLoginPage";
import { testData } from "../test-data/testData";

test.describe("Products Suite", () => {
  test("Test Case 8: Verify All Products and product detail page", async function ({
    page,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();
    await productPage.expectProductListVisible();
    await productPage.clickViewOnAnyproduct(testData.firstProduct.id);
    await productDetailsPage.expectProductDetailPageVisible(
      testData.firstProduct.id,
    );
    await productDetailsPage.expectProductInfoIsVisible(testData.firstProduct);
  });

  test("Test Case 9: Search Product", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();

    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();
    await productPage.searchProduct(testData.singleProductSearch.term);
    await productPage.expectSearchedProductsVisible(
      testData.singleProductSearch.expectedProducts,
    );
  });

  test("Test Case 18: View Category Products", async function ({ page }) {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await categoryPage.expectCategoriesVisible();

    await categoryPage.expandCategory(
      testData.categoryProducts.women.parent,
    );
    await categoryPage.selectSubcategory(testData.categoryProducts.women);
    await categoryPage.expectCategoryProductsVisible(
      testData.categoryProducts.women,
    );

    await categoryPage.expandCategory(testData.categoryProducts.men.parent);
    await categoryPage.selectSubcategory(testData.categoryProducts.men);
    await categoryPage.expectCategoryProductsVisible(
      testData.categoryProducts.men,
    );
  });

  test("Test Case 19: View and Cart Brand Products", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const brandPage = new BrandPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();
    await brandPage.expectBrandsVisible();

    await brandPage.selectBrand(testData.brandProducts.first);
    await brandPage.expectBrandProductsVisible(testData.brandProducts.first);

    await brandPage.selectBrand(testData.brandProducts.second);
    await brandPage.expectBrandProductsVisible(testData.brandProducts.second);
  });

  test("Test Case 20: Search Products and Verify Cart After Login", async function ({
    page,
    registeredUser,
  }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();

    await productPage.searchProduct(testData.multipleProductSearch.term);
    await productPage.expectSearchedProductsVisible(
      testData.multipleProductSearch.expectedProducts,
    );
    await productPage.expectMultipleProductsVisible();
    await productPage.addAllProductsToCart();

    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(
      testData.multipleProductSearch.expectedCartProducts,
    );

    await homePage.clickSignupLogin();
    await signupAndLoginPage.expectLoginPageVisible();
    await signupAndLoginPage.login(
      registeredUser.email,
      registeredUser.password,
    );
    await signupAndLoginPage.expectUserIsLoggedIn(registeredUser.name);

    await homePage.clickCart();
    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart(
      testData.multipleProductSearch.expectedCartProducts,
    );
  });

  test("Test Case 21: Add review on product", async function ({ page }) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickProducts();
    await productPage.expectProductsPageVisible();

    await productPage.clickViewOnAnyproduct(testData.firstProduct.id);
    await productDetailsPage.expectProductDetailPageVisible(
      testData.firstProduct.id,
    );
    await productDetailsPage.expectReviewSectionVisible();
    await productDetailsPage.submitReview(testData.productReview);
    await productDetailsPage.expectReviewSubmittedSuccessfully();
  });

  test("Test Case 22: Add to cart from Recommended items", async function ({
    page,
  }) {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.scrollToRecommendedItems();
    await homePage.expectRecommendedItemsVisible();

    await homePage.addRecommendedProductToCart(
      testData.recommendedProduct.id,
    );
    await homePage.clickViewCartFromModal();

    await cartPage.expectCartPageVisible();
    await cartPage.expectProductsInCart([testData.recommendedProduct]);
  });
});

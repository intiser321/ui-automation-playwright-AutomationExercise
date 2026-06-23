import { expect } from "@playwright/test";

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = page.locator("#cart_info_table");
    this.cartRows = this.cartTable.locator("tbody tr");
    this.proceedToCheckoutButton = page.locator("a.check_out");
    this.registrationModal = page.locator("#checkoutModal");
    this.registrationAndLoginLink = this.registrationModal.getByRole("link", {
      name: "Register / Login",
    });
  }

  getProductRow(productId) {
    return this.page.locator(`#product-${productId}`);
  }

  async expectCartPageVisible() {
    const cartText = this.page.getByText("Shopping Cart", { exact: true });
    await expect(cartText).toBeVisible();
  }

  async expectProductsInCart(expectedProducts) {
    await expect(this.cartTable).toBeVisible();
    await expect(this.cartRows).toHaveCount(expectedProducts.length);

    for (const expectedProduct of expectedProducts) {
      const productRow = this.getProductRow(expectedProduct.id);

      await expect(productRow).toBeVisible();
      await expect(
        productRow.getByRole("link", {
          name: expectedProduct.name,
          exact: true,
        }),
      ).toBeVisible();
      await expect(productRow.locator(".cart_price")).toHaveText(
        expectedProduct.price,
      );
      await expect(productRow.locator(".cart_quantity")).toHaveText(
        expectedProduct.quantity,
      );
      await expect(productRow.locator(".cart_total")).toHaveText(
        expectedProduct.total,
      );
    }
  }
  async expectProductWithProperQuantity(expectedProduct) {
    const productRow = this.getProductRow(expectedProduct.id);

    await expect(productRow).toBeVisible();
    await expect(
      productRow.getByRole("link", {
        name: expectedProduct.name,
        exact: true,
      }),
    ).toBeVisible();
    await expect(productRow.locator(".cart_quantity")).toHaveText(
      String(expectedProduct.quantity),
    );
  }

  async removeProductFromCart(productId) {
    const productRow = this.getProductRow(productId);
    await productRow.locator(".cart_quantity_delete").click();
  }

  async expectProductRemoved(productId) {
    await expect(this.getProductRow(productId)).toHaveCount(0);
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async expectRegistrationModalAndClickRegistration() {
    await expect(this.registrationModal).toBeVisible();
    await this.registrationAndLoginLink.click();
  }
}

export { CartPage };

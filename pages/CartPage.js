import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

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
    await this.recoverCartPageIfNeeded();
    await expect(this.page.getByText("Shopping Cart", { exact: true })).toBeVisible();
  }

  async expectProductsInCart(expectedProducts) {
    await this.recoverCartPageIfNeeded();
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
    await dismissBlockingAds(this.page);
    await productRow
      .locator(".cart_quantity_delete")
      .evaluate((removeButton) => removeButton.click());
  }

  async expectProductRemoved(productId) {
    await expect(this.getProductRow(productId)).toHaveCount(0);
  }

  async clickProceedToCheckout() {
    await dismissBlockingAds(this.page);
    await this.proceedToCheckoutButton.evaluate((link) => link.click());
  }

  async expectRegistrationModalAndClickRegistration() {
    await expect(this.registrationModal).toBeVisible();
    await dismissBlockingAds(this.page);
    await this.registrationAndLoginLink.evaluate((link) => link.click());
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async recoverCartPageIfNeeded() {
    for (let attempt = 0; attempt < 3; attempt++) {
      await dismissBlockingAds(this.page);

      if (await this.cartTable.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return;
      }

      const hasTransientServerError =
        await this.page
          .getByText(/problem with this site|500 Internal Server Error/i)
          .isVisible({ timeout: 500 })
          .catch(() => false);

      if (!hasTransientServerError && attempt > 0) {
        return;
      }

      if (this.page.url().includes("/view_cart")) {
        await this.page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
      } else {
        await this.page
          .goto("/view_cart", { waitUntil: "domcontentloaded" })
          .catch(() => {});
      }

      await this.page.waitForTimeout(1_000);
    }
  }
}

export { CartPage };

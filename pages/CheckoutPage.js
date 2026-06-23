import { expect } from "@playwright/test";

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressDetailsHeading = page.getByRole("heading", {
      name: "Address Details",
    });
    this.deliveryAddress = page.locator("#address_delivery");
    this.billingAddress = page.locator("#address_invoice");
    this.reviewOrderHeading = page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.orderTable = page.locator("#cart_items table");
    this.orderCommentInput = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole("link", { name: "Place Order" });
  }

  async expectCheckoutPageVisible() {
    await expect(this.page).toHaveURL(/\/checkout$/);
    await expect(this.addressDetailsHeading).toBeVisible();
  }

  async expectDeliveryAndBillingAddresses(expectedAddress) {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();

    const expectedAddressValues = [
      expectedAddress.firstName,
      expectedAddress.lastName,
      expectedAddress.company,
      expectedAddress.firstAddress,
      expectedAddress.secondAddress,
      expectedAddress.city,
      expectedAddress.state,
      expectedAddress.zipcode,
      expectedAddress.country,
      expectedAddress.mobile,
    ];

    for (const value of expectedAddressValues) {
      await expect(this.deliveryAddress).toContainText(value);
      await expect(this.billingAddress).toContainText(value);
    }
  }

  async expectReviewOrderVisible() {
    await expect(this.reviewOrderHeading).toBeVisible();
    await expect(this.orderTable).toBeVisible();
  }

  async expectProductsInOrder(expectedProducts) {
    for (const expectedProduct of expectedProducts) {
      const productRow = this.orderTable.getByRole("row").filter({
        has: this.page.getByRole("link", {
          name: expectedProduct.name,
          exact: true,
        }),
      });

      await expect(productRow).toBeVisible();
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

  async enterOrderComment(comment) {
    await this.orderCommentInput.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }
}

export { CheckoutPage };

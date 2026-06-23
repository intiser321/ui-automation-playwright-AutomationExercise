import { expect } from "@playwright/test";

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentHeading = page.getByRole("heading", { name: "Payment" });
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('[data-qa="pay-button"]');
    this.orderPlacedHeading = page.getByRole("heading", {
      name: "Order Placed!",
    });
  }

  async expectPaymentPageVisible() {
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.paymentHeading).toBeVisible();
  }

  async fillPaymentDetails(paymentDetails) {
    await this.nameOnCardInput.fill(paymentDetails.nameOnCard);
    await this.cardNumberInput.fill(paymentDetails.cardNumber);
    await this.cvcInput.fill(paymentDetails.cvc);
    await this.expiryMonthInput.fill(paymentDetails.expiryMonth);
    await this.expiryYearInput.fill(paymentDetails.expiryYear);
  }

  async payAndConfirmOrder() {
    await this.payAndConfirmButton.click();
  }

  async expectOrderPlacedSuccessfully() {
    await expect(this.orderPlacedHeading).toBeVisible();
  }
}

export { PaymentPage };

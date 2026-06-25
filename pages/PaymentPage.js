import { expect } from "@playwright/test";
import { readFile, stat, writeFile } from "node:fs/promises";
import { dismissBlockingAds } from "../utils/adHandler";

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
    this.downloadInvoiceButton = page.getByRole("link", {
      name: "Download Invoice",
    });
    this.continueButton = page.locator('[data-qa="continue-button"]');
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
    await dismissBlockingAds(this.page);
    await this.payAndConfirmButton.evaluate((button) => button.click());
  }

  async expectOrderPlacedSuccessfully() {
    await expect(this.orderPlacedHeading).toBeVisible();
  }

  async downloadAndVerifyInvoice(expectedInvoice, destinationPath) {
    await dismissBlockingAds(this.page);
    const invoiceHref = await this.downloadInvoiceButton.getAttribute("href");
    const downloadPromise = this.page.waitForEvent("download", {
      timeout: 10_000,
    });

    await this.downloadInvoiceButton.evaluate((link) => link.click());
    const download = await downloadPromise.catch(() => null);

    if (!download) {
      await this.downloadInvoiceFromHref(invoiceHref, destinationPath);
      await this.expectInvoiceFileDownloaded(destinationPath);
      return;
    }

    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe(expectedInvoice.fileName);

    await download.saveAs(destinationPath);
    await this.expectInvoiceFileDownloaded(destinationPath);
  }

  async downloadInvoiceFromHref(invoiceHref, destinationPath) {
    expect(invoiceHref).toBeTruthy();

    const response = await this.page.request.get(invoiceHref);

    expect(response.ok()).toBeTruthy();
    await writeFile(destinationPath, await response.body());
  }

  async expectInvoiceFileDownloaded(destinationPath) {
    const downloadedFileStats = await stat(destinationPath);
    expect(downloadedFileStats.size).toBeGreaterThan(0);

    const invoiceContent = await readFile(destinationPath, "utf8");
    expect(invoiceContent.trim()).not.toBe("");
  }

  async clickContinue() {
    await dismissBlockingAds(this.page);
    await this.continueButton.evaluate((button) => button.click());
  }
}

export { PaymentPage };

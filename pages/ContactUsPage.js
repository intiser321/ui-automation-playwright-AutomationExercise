import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

class ContactUsPage {
  constructor(page) {
    this.page = page;
    //locators
    this.nameField = page.getByRole("textbox", { name: "Name" });
    this.emailField = page.getByRole("textbox", {
      name: "Email",
      exact: true,
    });
    this.subjectField = page.getByRole("textbox", { name: "Subject" });
    this.messageField = page.getByRole("textbox", {
      name: "Your Message Here",
    });
    this.submitBtn = page.locator('[data-qa="submit-button"]');
    this.uploadFileField = page.locator('input[name="upload_file"]');
    this.successMessage = page.locator("div.status.alert.alert-success");
    this.homeBtn = page.locator("a.btn.btn-success");
    this.featuresItemsHeading = page.getByRole("heading", {
      name: "Features Items",
    });
  }

  async expectContactUsPageVisible() {
    await this.page.waitForLoadState("domcontentloaded");
    const contactUsText = this.page.getByRole("heading", {
      name: "GET IN TOUCH",
    });
    await expect(contactUsText).toBeVisible();
  }

  async enterInfoInContactUsForm(name, email, subject, message) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.subjectField.fill(subject);
    await this.messageField.fill(message);
  }
  async uploadFile(filepath) {
    await this.uploadFileField.setInputFiles(filepath);
  }
  async submitAndAcceptDialog() {
    await dismissBlockingAds(this.page);
    const dialogHandled = new Promise((resolve, reject) => {
      this.page.once("dialog", (dialog) => {       //listner for the confirmation dialog
        try {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toBe("Press OK to proceed!");
          dialog.accept().then(resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });

    await this.submitBtn.evaluate((button) => button.click());
    await dialogHandled;
  }

  async expectSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }
  async clickHomeBtn() {
    await dismissBlockingAds(this.page);
    await this.homeBtn.evaluate((link) => link.click());
    await expect(this.page).toHaveURL("/");
  }
  async expectRedirectedToHomePage() {
    await expect(this.page).toHaveURL("/");
    await expect(this.featuresItemsHeading).toBeVisible();
  }
}

export { ContactUsPage };

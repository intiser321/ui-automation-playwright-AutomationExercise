import { test } from "../fixtures/accountFixture";
import { HomePage } from "../pages/HomePage";
import { testData } from "../test-data/testData";
import { ContactUsPage } from "../pages/ContactUsPage";
import path from "node:path";

test.describe("Contact Us suite", () => {
  test("Test Case 6: Contact Us Form", async function ({ page }) {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    await homePage.goTo();
    await homePage.clickContactUs();
    await contactUsPage.expectContactUsPageVisible();
    await contactUsPage.enterInfoInContactUsForm(
      testData.contactUsInfo.name,
      testData.contactUsInfo.email,
      testData.contactUsInfo.subject,
      testData.contactUsInfo.message,
    );
    const filePath = path.resolve("test-data", "files", "AutomationFile.pdf");

    await contactUsPage.uploadFile(filePath);
    await contactUsPage.submitAndAcceptDialog();
    await contactUsPage.expectSuccessMessage();
    await contactUsPage.clickHomeBtn();
    await contactUsPage.expectRedirectedToHomePage();
  });
});

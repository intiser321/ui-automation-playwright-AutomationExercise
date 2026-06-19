import { test } from "../fixtures/accountFixture";
import { HomePage } from "../pages/HomePage";
import { SignupAndLoginPage } from "../pages/SignupAndLoginPage";
import { testData } from "../test-data/testData";

test.describe("Authentication (signup and login) suite", () => {
  test("Test Case 1: Register User", async function ({ page }) {
    const homePage = new HomePage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    const email = testData.userRegistration.getEmail();

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectSignupPageVisible();
    //signupAndLoginPage.inputSignupEmail(email);
    //signupAndLoginPage.inputSignupName(testData.userRegistration.name);
    await signupAndLoginPage.signup(email, testData.userRegistration.name);
    await signupAndLoginPage.expectAccInfoHeaderVisible();

    await signupAndLoginPage.selectTitle(testData.userRegistration.title);
    await signupAndLoginPage.expectTitleSelected(
      testData.userRegistration.title,
    );

    await signupAndLoginPage.expectNameAndEmailInAccInfoPage(
      testData.userRegistration.name,
      email,
    );
    await signupAndLoginPage.inputPassword(testData.userRegistration.password);
    await signupAndLoginPage.selectDateOfBirth(
      testData.userRegistration.dateOfBirth.day,
      testData.userRegistration.dateOfBirth.month,
      testData.userRegistration.dateOfBirth.year,
    );

    await signupAndLoginPage.selectCheckboxes();
    await signupAndLoginPage.expectCheckboxesSelected();
    await signupAndLoginPage.fillAddressDetails(testData.userRegistration);
    await signupAndLoginPage.createAccount();
    await signupAndLoginPage.expectAccountCreated();
    await signupAndLoginPage.clickContinueBtn();
    await signupAndLoginPage.expectNameisVisibleAfterSignup(
      testData.userRegistration.name,
    );

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 2: Login User with correct email and password", async function ({
    page,
    registeredUser,
  }) {
    const homePage = new HomePage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectLoginPageVisible();
    await signupAndLoginPage.login(
      registeredUser.email,
      registeredUser.password,
    );
    await signupAndLoginPage.expectUserIsLoggedIn(registeredUser.name);

    await signupAndLoginPage.deleteAccount();
    await signupAndLoginPage.expectAccountDeleted();
    registeredUser.deleted = true;
    await signupAndLoginPage.clickContinueBtn();
  });

  test("Test Case 3: Login User with incorrect email and password", async function ({
    page,
  }) {
    const homePage = new HomePage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);
    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectLoginPageVisible();
    await signupAndLoginPage.login(
      testData.userRegistration.getEmail(),
      testData.userLogin.invalidLogin.invalidPassword,
    );
    await signupAndLoginPage.expectErrorMessageForInvalidLogin();
  });

  test("Test Case 4: Logout User", async function ({ page, registeredUser }) {
    const homePage = new HomePage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectLoginPageVisible();
    await signupAndLoginPage.login(
      registeredUser.email,
      registeredUser.password,
    );
    await signupAndLoginPage.expectUserIsLoggedIn(registeredUser.name);
    await signupAndLoginPage.clickLogoutBtn();
    await signupAndLoginPage.expectUserIsLoggedOut();
  });
  test("Test Case 5: Register User with existing email", async function ({
    page,
    registeredUser,
  }) {
    const homePage = new HomePage(page);
    const signupAndLoginPage = new SignupAndLoginPage(page);

    await homePage.goTo();
    await homePage.expectHomePageVisible();
    await homePage.clickSignupLogin();

    await signupAndLoginPage.expectSignupPageVisible();
    await signupAndLoginPage.signup(
      registeredUser.email,
      registeredUser.name,
    );
    await signupAndLoginPage.expectEmailAlreadyExistsText();
  });
});

import { expect } from "@playwright/test";
import { dismissBlockingAds } from "../utils/adHandler";

class SignupAndLoginPage {
  constructor(page) {
    this.page = page;
    //locators for signup
    this.registrationheading = page.getByRole("heading", {
      name: "New User Signup!",
    });

    this.signupEmailInput = page.locator("//input[@data-qa='signup-email']");
    this.signupNameInput = page.locator("//input[@data-qa='signup-name']");
    this.signUpBtn = page.locator("//button[@data-qa='signup-button']");

    //After sign up, the account information page
    this.accountInfoHeader = page.getByRole("heading", {
      name: "Enter Account Information",
    });
    this.accountNameInput = page.locator('[data-qa="name"]');
    this.accountEmailInput = page.locator('[data-qa="email"]');
    this.accountPasswordInput = page.locator('[data-qa="password"]');

    //dropdown
    this.dayDropdown = page.locator('[data-qa="days"]');
    this.monthDropdown = page.locator('[data-qa="months"]');
    this.yearDropdown = page.locator('[data-qa="years"]');

    //checkboxes
    this.newsLetterCheckbox = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.specialOfferCheckbox = page.getByRole("checkbox", {
      name: "Receive special offers from our partners!",
    });
    //Address section
    this.firstNameInput = page.getByRole("textbox", { name: "First name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name *" });
    this.companyInput = page.getByLabel("Company", { exact: true });
    this.addressOne = page.locator('[data-qa="address"]');
    this.addressTwo = page.locator('[data-qa="address2"]');
    this.countryDropdown = page.getByRole("combobox", { name: "Country *" });
    this.stateInput = page.getByRole("textbox", { name: "State *" });
    this.cityInput = page.getByRole("textbox", { name: "City *" });
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileInput = page.locator('[data-qa="mobile_number"]');
    this.createAccBtn = page.getByRole("button", { name: "Create Account" });

    //after account creation
    this.accCreationConfirmationHeading = page.getByRole("heading", {
      name: "Account Created!",
    });
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.deleteAccBtn = page.getByRole("link", { name: "Delete Account" });
    this.deleteAccConfirmation = page.getByRole("heading", {
      name: "Account Deleted!",
    });

    //locators for login
    this.loginheading = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailInput = page.locator("//input[@data-qa='login-email']");
    this.loginPasswordInput = page.locator(
      "//input[@data-qa='login-password']",
    );
    this.loginBtn = page.locator("//button[@data-qa='login-button']");

    //validation message for invalid login

    this.invalidLoginValidation = page.getByText(
      "Your email or password is incorrect!",
      { exact: true },
    );
    this.emailAlreadyExist = page.getByText("Email Address already exist!", {
      exact: true,
    });

    this.logoutBtn = page.getByRole("link", { name: "Logout" });
  }

  //signup or registration methods

  async expectSignupPageVisible() {
    await expect(this.registrationheading).toBeVisible();
  }

  async inputSignupEmail(signupEmail) {
    await this.signupEmailInput.fill(signupEmail);
  }
  async inputSignupName(signupName) {
    await this.signupNameInput.fill(signupName);
  }
  async signup(email, name) {
    await dismissBlockingAds(this.page);
    await this.inputSignupEmail(email);
    await this.inputSignupName(name);
    await this.signUpBtn.evaluate((button) => button.click());
  }
  async expectAccInfoHeaderVisible() {
    await expect(this.accountInfoHeader).toBeVisible();
  }
  async selectTitle(title) {
    await this.page.getByRole("radio", { name: title }).check(); //title will be taken from testdata
  }
  async expectTitleSelected(title) {
    await expect(this.page.getByRole("radio", { name: title })).toBeChecked(); //title will be taken from testdata
  }

  async expectNameAndEmailInAccInfoPage(name, email) {
    await expect(this.accountEmailInput).toHaveValue(email);
    await expect(this.accountNameInput).toHaveValue(name);
    await expect(this.accountEmailInput).toBeDisabled();
  }
  async inputPassword(password) {
    await this.accountPasswordInput.fill(password);
  }
  async selectDateOfBirth(day, month, year) {
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
  }
  async selectCheckboxes() {
    await this.newsLetterCheckbox.check();
    await this.specialOfferCheckbox.check();
  }
  async expectCheckboxesSelected() {
    await expect(this.newsLetterCheckbox).toBeChecked();
    await expect(this.specialOfferCheckbox).toBeChecked();
  }
  async fillAddressDetails(info) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.companyInput.fill(info.company);
    await this.addressOne.fill(info.firstAddress);
    await this.addressTwo.fill(info.secondAddress);
    await this.countryDropdown.selectOption(info.country);
    await this.stateInput.fill(info.state);
    await this.cityInput.fill(info.city);
    await this.zipcodeInput.fill(info.zipcode);
    await this.mobileInput.fill(info.mobile);
  }

  async createAccount() {
    await dismissBlockingAds(this.page);
    await this.createAccBtn.evaluate((button) => button.click());
  }
  async expectAccountCreated() {
    await expect(this.accCreationConfirmationHeading).toBeVisible();
  }

  async expectNameisVisibleAfterSignup(name) {
    const loggedInUser = this.page.getByText(`Logged in as ${name}`, {
      exact: true,
    });
    await expect(loggedInUser).toBeVisible();
  }
  async deleteAccount() {
    await dismissBlockingAds(this.page);
    await this.deleteAccBtn.evaluate((link) => link.click());
  }
  async expectAccountDeleted() {
    await expect(this.deleteAccConfirmation).toBeVisible();
  }

  async clickContinueBtn() {
    await dismissBlockingAds(this.page);
    await this.continueBtn.evaluate((button) => button.click());
  }

  //Login methods

  async expectLoginPageVisible() {
    await expect(this.loginheading).toBeVisible();
  }

  async inputLoginEmail(loginEmail) {
    await this.loginEmailInput.fill(loginEmail);
  }

  async inputLoginPassword(loginPass) {
    await this.loginPasswordInput.fill(loginPass);
  }
  async login(email, password) {
    await dismissBlockingAds(this.page);
    await this.inputLoginEmail(email);
    await this.inputLoginPassword(password);
    await this.loginBtn.evaluate((button) => button.click());
  }

  async expectUserIsLoggedIn(name) {
    const loggedInUser = this.page.getByText(`Logged in as ${name}`, {
      exact: true,
    });
    await expect(loggedInUser).toBeVisible();
  }

  async expectErrorMessageForInvalidLogin() {
    await expect(this.invalidLoginValidation).toBeVisible();
  }

  async clickLogoutBtn() {
    await dismissBlockingAds(this.page);
    await this.logoutBtn.evaluate((link) => link.click());
  }

  async expectUserIsLoggedOut() {
    await expect(this.loginheading).toBeVisible();
    await expect(this.loginBtn).toBeEnabled();
  }

  async expectEmailAlreadyExistsText() {
    await expect(this.emailAlreadyExist).toBeVisible();
  }
}
export { SignupAndLoginPage };

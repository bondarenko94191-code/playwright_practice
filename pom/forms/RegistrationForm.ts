import { Locator, Page } from "@playwright/test";

export default class RegistrationForm {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly registrationCompleteMessage: Locator;
  readonly userExistMessage: Locator;
  readonly nameRequiredMessage: Locator;
  readonly wrongNameLengthMessage: Locator;
  readonly invalidNameMessage: Locator;
  readonly lastNameRequiredMessage: Locator;
  readonly lastNameLengthMessage: Locator;
  readonly lastNameInvalidMessage: Locator;
  readonly emailRequiredMessage: Locator;
  readonly incorrectEmailMessage: Locator;
  readonly passwordRequiredMessage: Locator;
  readonly passwordLengthMessage: Locator;
  readonly reenterPasswordRequiredMessage: Locator;
  readonly reenterPasswordMismatchMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.submitButton = page.getByRole("button", { name: "Register" });
    this.registrationCompleteMessage = page.getByText("Registration complete");
    this.userExistMessage = page.getByText("User already exists");
    this.nameRequiredMessage = page.getByText("Name required");
    this.wrongNameLengthMessage = page.getByText(
      "Name has to be from 2 to 20 characters long",
    );
    this.invalidNameMessage = page.getByText("Name is invalid");
    this.lastNameRequiredMessage = page.getByText("Last name required");
    this.lastNameLengthMessage = page.getByText(
      "Last name has to be from 2 to 20 characters long",
    );
    this.lastNameInvalidMessage = page.getByText("Last name is invalid");
    this.emailRequiredMessage = page.getByText("Email required");
    this.incorrectEmailMessage = page.getByText("Email is incorrect");
    this.passwordRequiredMessage = page.getByText("Password required");
    this.passwordLengthMessage = page.getByText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    this.reenterPasswordRequiredMessage = page.getByText(
      "Re-enter password required",
    );
    this.reenterPasswordMismatchMessage = page.getByText(
      "Passwords do not match",
    );
  }
  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async fillRegistrationForm(
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async submitRegistrationForm() {
    await this.submitButton.click();
  }

  async triggerValidationError(field: Locator) {
    await field.focus();
    await field.blur();
  }
}

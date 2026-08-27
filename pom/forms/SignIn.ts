import { Locator, Page } from "@playwright/test";

export default class SignIn {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#signinEmail");
    this.passwordInput = page.locator("#signinPassword");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

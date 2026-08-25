import { Locator, Page } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator(".btn-primary", { name: "Sign up" });
    this.signIn = page.locator(".header_signin", { name: "Sign In" });
  }
  async openHomePage() {
    await this.page.goto("/");
  }
  async openSignUpForm() {
    await this.signUpButton.click();
  }
  async openSignInForm() {
    await this.signIn.click();
  }
}

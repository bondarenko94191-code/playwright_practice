import { Locator, Page } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator(".btn-primary", { name: "Sign up" });
  }
  async openHomePage() {
    await this.page.goto("/");
  }
  async openSignUpForm() {
    await this.signUpButton.click();
  }
}

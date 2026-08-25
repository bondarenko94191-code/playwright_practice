import { Locator, Page } from "@playwright/test";

export default class GaragePage {
  private readonly page: Page;
  public readonly pageHeader: Locator;
  public readonly addCarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator("h1", { hasText: "Garage" });

    this.addCarButton = page.getByRole("button", { name: "Add car" });
  }

  async openAddCarForm() {
    await this.addCarButton.click();
  }

  async open() {
    await this.page.goto("/panel/garage");
  }
}

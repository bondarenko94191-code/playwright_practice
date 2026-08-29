import { test as base, Page } from "@playwright/test";
import GaragePage from "../pom/pages/GaragePage";

type MyFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    // console.log("BEFORE:", page.url());

    await garagePage.open();
    // console.log("Current URL:", page.url());
    // console.log("AFTER:", page.url());
    await use(garagePage);
  },
});

export { expect } from "@playwright/test";

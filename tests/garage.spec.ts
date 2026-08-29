import { test, expect } from "../fixtures/garage.ts";
import { Locator, Page } from "@playwright/test";

test("Logged user can open garage page", async ({ userGaragePage }) => {
  await expect(userGaragePage.pageHeader).toBeVisible();

  await expect(userGaragePage.addCarButton).toBeVisible();
});

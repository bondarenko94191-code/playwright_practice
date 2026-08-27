import { test, expect } from "../fixtures/garage.ts";

test("Logged user can open garage page", async ({ userGaragePage }) => {
  await expect(userGaragePage.pageHeader).toBeVisible();

  await expect(userGaragePage.addCarButton).toBeVisible();
});

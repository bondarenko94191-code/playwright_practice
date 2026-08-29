import { expect } from "@playwright/test";
import AuthController from "../../controllers/AuthController";
import { test } from "../../fixtures/app";

let authController: AuthController;

test.beforeEach(async () => {
  authController = new AuthController();
});

test.describe("Mock request", async () => {
  test("Mocking the profile request", async ({ app }) => {
    const fakeName = {
      data: {
        userId: 377563,
        photoFilename: "default-user.png",
        name: "Hennadiy",
        lastName: "Bondarenko",
      },
    };

    await app.page.route("**/api/users/profile", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(fakeName),
      }),
    );
    const responsePromise = app.page.waitForResponse("**/api/users/profile");
    await app.page.goto("/panel/profile");
    const response = await responsePromise;

    const responseBody = await response.json();
    expect(responseBody).toEqual(fakeName);

    console.log("URL:", app.page.url());
  });
});

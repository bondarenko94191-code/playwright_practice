import { test, expect } from "@playwright/test";
import AuthController from "../../controllers/AuthController";

test.describe("Auth test", () => {
  test("Login", async ({ request }) => {
    const authController = new AuthController();
    const response = await authController.signIn(
      request,
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!,
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.data.userId).toBeDefined();
  });
});

import { test as setup } from "@playwright/test";
import HomePage from "../../pom/pages/HomePage";
import SignIn from "../../pom/forms/SignIn";

setup("Authorize User1", async ({ page }) => {
  const homePage = new HomePage(page);
  const signInForm = new SignIn(page);

  await homePage.openHomePage();
  await homePage.openSignInForm();

  await signInForm.login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!,
  );

  await page.waitForURL("**/panel/garage");

  await page.context().storageState({
    path: ".auth/User1State.json",
  });
});

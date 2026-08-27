import { test as base, Page } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import GaragePage from "../pom/pages/GaragePage";
import RegistrationForm from "../pom/forms/RegistrationForm";
import SignIn from "../pom/forms/SignIn";

type App = {
  page: Page;
  homePage: HomePage;
  signIn: SignIn;
  garagePage: GaragePage;
  registration: RegistrationForm;
};
export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app = {
      page,
      homePage: new HomePage(page),
      signIn: new SignIn(page),
      garagePage: new GaragePage(page),
      registration: new RegistrationForm(page),
    };
    await use(app);
  },
});

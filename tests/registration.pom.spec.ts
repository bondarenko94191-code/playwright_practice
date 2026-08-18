import { test, expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import RegistrationForm from "../pom/forms/RegistrationForm";

test.describe("Successful Registration", () => {
  let homePage: HomePage;
  let registrationForm: RegistrationForm;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationForm = new RegistrationForm(page);
    await homePage.openHomePage();
    await homePage.openSignUpForm();
  });
  test("Register new user", async () => {
    await registrationForm.fillName("Alina");
    await registrationForm.fillLastName("Tiupalova");
    await registrationForm.fillEmail(`aqa-_${Date.now()}@mail.com`);
    await registrationForm.fillPassword("Test1234");
    await registrationForm.fillRepeatPassword("Test1234");
    await registrationForm.submitRegistrationForm();
    await expect(registrationForm.registrationCompleteMessage).toBeVisible();
  });
});

test.describe("Unsuccessful Registration", () => {
  let homePage: HomePage;
  let registrationForm: RegistrationForm;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationForm = new RegistrationForm(page);
    await homePage.openHomePage();
    await homePage.openSignUpForm();
  });
  test("Register user that already exists", async () => {
    await registrationForm.fillName("Alina");
    await registrationForm.fillLastName("Tiupalova");
    await registrationForm.fillEmail(`bondarenko94191@gmail.com`);
    await registrationForm.fillPassword("Test1234");
    await registrationForm.fillRepeatPassword("Test1234");
    await registrationForm.submitRegistrationForm();
    await expect(registrationForm.userExistMessage).toBeVisible();
  });
  test("All fields are filled with invalid data", async () => {
    await registrationForm.fillName("A");
    await registrationForm.fillLastName("T");
    await registrationForm.fillEmail(`user@`);
    await registrationForm.fillPassword("test");
    await registrationForm.fillRepeatPassword("test");
    await expect(registrationForm.submitButton).toBeDisabled();
  });
});

test.describe("Fields Validation", () => {
  let homePage: HomePage;
  let registrationForm: RegistrationForm;
  test.describe("Name field validation", () => {
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registrationForm = new RegistrationForm(page);
      await homePage.openHomePage();
      await homePage.openSignUpForm();
    });
    test("Validation messages for empty Name field ", async () => {
      await registrationForm.fillName("");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.nameRequiredMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Name field(1 digit)", async () => {
      await registrationForm.fillName("A");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.wrongNameLengthMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Name field(21 digit)", async () => {
      await registrationForm.fillName("AlinaAlinaAlinaAlinaA");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.wrongNameLengthMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Name field(2 digit)", async () => {
      await registrationForm.fillName("Al");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.wrongNameLengthMessage).not.toBeVisible();
      await expect(registrationForm.nameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Name field(20 digit)", async () => {
      await registrationForm.fillName("AlinaAlinaAlinaAlin");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.wrongNameLengthMessage).not.toBeVisible();
      await expect(registrationForm.nameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid characters in Name field", async () => {
      await registrationForm.fillName("Alina123");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Name field (complex name with '-'", async () => {
      await registrationForm.fillName("Alina-Maria");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).not.toBeVisible();
      await expect(registrationForm.nameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Name field (backspace at the beginning and end)", async () => {
      await registrationForm.fillName(" Alina ");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).not.toBeVisible();
      await expect(registrationForm.nameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic characters", async () => {
      await registrationForm.fillName("Алина");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic characters with invalid symbols", async () => {
      await registrationForm.fillName("Алина123");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic and Latin characters ", async () => {
      await registrationForm.fillName("АлинаAlina");
      await registrationForm.triggerValidationError(registrationForm.nameInput);
      await expect(registrationForm.invalidNameMessage).toBeVisible();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Last Name field validation", () => {
    let homePage: HomePage;
    let registrationForm: RegistrationForm;
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registrationForm = new RegistrationForm(page);
      await homePage.openHomePage();
      await homePage.openSignUpForm();
    });
    test("Validation messages for empty Last Name field ", async () => {
      await registrationForm.fillLastName("");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameRequiredMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Last Name field(1 digit)", async () => {
      await registrationForm.fillLastName("T");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameLengthMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Last Name field(21 digit)", async () => {
      await registrationForm.fillLastName("TiupalovaTiupalovaTiu");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameLengthMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Last Name field(2 digit)", async () => {
      await registrationForm.fillLastName("Al");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameLengthMessage).not.toBeVisible();
      await expect(registrationForm.lastNameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Last Name field(20 digit)", async () => {
      await registrationForm.fillLastName("TiupalovaTiupalovaTi");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameLengthMessage).not.toBeVisible();
      await expect(registrationForm.lastNameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid characters in Last Name field", async () => {
      await registrationForm.fillLastName("Tiupalova123");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Last Name field (complex name with '-'", async () => {
      await registrationForm.fillLastName("Tiupalova-Bondarenko");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).not.toBeVisible();
      await expect(registrationForm.lastNameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Last Name field (backspace at the beginning and end)", async () => {
      await registrationForm.fillLastName(" Tiupalova ");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).not.toBeVisible();
      await expect(registrationForm.lastNameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic characters", async () => {
      await registrationForm.fillLastName("Тюпалова");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic characters with invalid symbols", async () => {
      await registrationForm.fillLastName("Тюпалова123");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic and Latin characters ", async () => {
      await registrationForm.fillLastName("ТюпаловаTiupalova");
      await registrationForm.triggerValidationError(
        registrationForm.lastNameInput,
      );
      await expect(registrationForm.lastNameInvalidMessage).toBeVisible();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Email field validation", () => {
    let homePage: HomePage;
    let registrationForm: RegistrationForm;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registrationForm = new RegistrationForm(page);
      await homePage.openHomePage();
      await homePage.openSignUpForm();
    });
    test("Validation messages for empty Email field ", async () => {
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.emailRequiredMessage).toBeVisible();
      await expect(registrationForm.emailInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format without domain", async () => {
      await registrationForm.fillEmail("user@");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).toBeVisible();
      await expect(registrationForm.emailInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format with multiple @ symbols", async () => {
      await registrationForm.fillEmail("user@@domain.com");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).toBeVisible();
      await expect(registrationForm.emailInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format without @ symbol", async () => {
      await registrationForm.fillEmail("userdomain.com");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).toBeVisible();
      await expect(registrationForm.emailInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid Email format", async () => {
      await registrationForm.fillEmail("user@domain.com");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).not.toBeVisible();
      await expect(registrationForm.emailInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Max length of Email field (64 characters in local part)", async () => {
      await registrationForm.fillEmail("a".repeat(63) + "@domain.com");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).not.toBeVisible();
      await expect(registrationForm.emailInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Max length of Email field (about 255 characters in domain part)", async () => {
      await registrationForm.fillEmail("user@" + "a".repeat(247) + ".com");
      await registrationForm.triggerValidationError(
        registrationForm.emailInput,
      );
      await expect(registrationForm.incorrectEmailMessage).not.toBeVisible();
      await expect(registrationForm.emailInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Password field validation", () => {
    let homePage: HomePage;
    let registrationForm: RegistrationForm;
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registrationForm = new RegistrationForm(page);
      await homePage.openHomePage();
      await homePage.openSignUpForm();
    });

    test("Validation messages for empty Password field ", async () => {
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordRequiredMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Password field(8 digit)", async () => {
      await registrationForm.fillPassword("Test1234");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).not.toBeVisible();
      await expect(registrationForm.passwordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Password field(7 digit)", async () => {
      await registrationForm.fillPassword("Test123");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Password field(15 digit)", async () => {
      await registrationForm.fillPassword("Test12345678901");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).not.toBeVisible();
      await expect(registrationForm.passwordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Password field(16 digit)", async () => {
      await registrationForm.fillPassword("Test123456789012");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without capital letter", async () => {
      await registrationForm.fillPassword("test1234");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without small letter", async () => {
      await registrationForm.fillPassword("TEST1234");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without digit", async () => {
      await registrationForm.fillPassword("TestTest");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password with special characters", async () => {
      await registrationForm.fillPassword("Test1234!");
      await registrationForm.triggerValidationError(
        registrationForm.passwordInput,
      );
      await expect(registrationForm.passwordLengthMessage).not.toBeVisible();
      await expect(registrationForm.passwordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Repeat Password field validation", () => {
    let homePage: HomePage;
    let registrationForm: RegistrationForm;
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      registrationForm = new RegistrationForm(page);
      homePage.openHomePage();
      homePage.openSignUpForm();
    });
    test("Validation messages for empty Repeat Password field ", async () => {
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );

      await expect(
        registrationForm.reenterPasswordRequiredMessage,
      ).toBeVisible();
      await expect(registrationForm.repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password valid length 8 digits", async () => {
      await registrationForm.fillRepeatPassword("Test1234");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(registrationForm.passwordLengthMessage).not.toBeVisible();
      await expect(registrationForm.repeatPasswordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password valid length 15 digits", async () => {
      await registrationForm.fillRepeatPassword("Test12345678901");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(registrationForm.passwordLengthMessage).not.toBeVisible();
      await expect(registrationForm.repeatPasswordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password invalid length 7 digits", async () => {
      await registrationForm.fillRepeatPassword("Test123");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password invalid length 16 digits", async () => {
      await registrationForm.fillRepeatPassword("Test123456789012");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(registrationForm.passwordLengthMessage).toBeVisible();
      await expect(registrationForm.repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    test("Repeat Password does not match Password", async ({ page }) => {
      await registrationForm.fillPassword("Test1234");
      await registrationForm.fillRepeatPassword("Test12345");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(
        registrationForm.reenterPasswordMismatchMessage,
      ).toBeVisible();
      await expect(registrationForm.repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password matches Password", async ({ page }) => {
      await registrationForm.fillPassword("Test1234");
      await registrationForm.fillRepeatPassword("Test1234");
      await registrationForm.triggerValidationError(
        registrationForm.repeatPasswordInput,
      );
      await expect(
        registrationForm.reenterPasswordMismatchMessage,
      ).not.toBeVisible();
      await expect(registrationForm.repeatPasswordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
});

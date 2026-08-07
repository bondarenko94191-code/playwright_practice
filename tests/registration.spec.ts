import { test, expect } from "@playwright/test";

test.describe("Successful Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".btn-primary", { name: "Sign up" }).click();
  });
  test("Register new user", async ({ page }) => {
    await page.locator("#signupName").fill("Alina");
    await page.locator("#signupLastName").fill("Tiupalova");
    await page.locator("#signupEmail").fill(`aqa-_${Date.now()}@mail.com`);
    await page.locator("#signupPassword").fill("Test1234");
    await page.locator("#signupRepeatPassword").fill("Test1234");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByText("Registration complete")).toBeVisible();
  });
});

test.describe("Unsuccessful Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".btn-primary", { name: "Sign up" }).click();
  });
  test("Register user that already exists", async ({ page }) => {
    await page.locator("#signupName").fill("Alina");
    await page.locator("#signupLastName").fill("Tiupalova");
    await page.locator("#signupEmail").fill(`bondarenko94191@gmail.com`);
    await page.locator("#signupPassword").fill("Test1234");
    await page.locator("#signupRepeatPassword").fill("Test1234");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByText("User already exists")).toBeVisible();
  });
  test("All fields are filled with invalid data", async ({ page }) => {
    await page.locator("#signupName").fill("A");
    await page.locator("#signupLastName").fill("T");
    await page.locator("#signupEmail").fill(`user@`);
    await page.locator("#signupPassword").fill("test");
    await page.locator("#signupRepeatPassword").fill("test");
    await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
  });
});

test.describe("Fields Validation", () => {
  test.describe("Name field validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator(".btn-primary", { name: "Sign up" }).click();
    });
    test("Validation messages for empty Name field ", async ({ page }) => {
      await page.locator("#signupName").focus();
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name required")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Name field(1 digit)", async ({ page }) => {
      await page.locator("#signupName").fill("A");
      await page.locator("#signupName").blur();
      await expect(
        page.getByText("Name has to be from 2 to 20 characters long"),
      ).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Name field(21 digit)", async ({ page }) => {
      await page.locator("#signupName").fill("AlinaAlinaAlinaAlinaA");
      await page.locator("#signupName").blur();
      await expect(
        page.getByText("Name has to be from 2 to 20 characters long"),
      ).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Name field(2 digit)", async ({ page }) => {
      await page.locator("#signupName").fill("Al");
      await page.locator("#signupName").blur();
      await expect(
        page.getByText("Name has to be from 2 to 20 characters long"),
      ).not.toBeVisible();
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Name field(20 digit)", async ({ page }) => {
      await page.locator("#signupName").fill("AlinaAlinaAlinaAlin");
      await page.locator("#signupName").blur();
      await expect(
        page.getByText("Name has to be from 2 to 20 characters long"),
      ).not.toBeVisible();
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid characters in Name field", async ({ page }) => {
      await page.locator("#signupName").fill("Alina123");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Name field (complex name with '-'", async ({
      page,
    }) => {
      await page.locator("#signupName").fill("Alina-Maria");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).not.toBeVisible();
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Name field (backspace at the beginning and end)", async ({
      page,
    }) => {
      await page.locator("#signupName").fill(" Alina ");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).not.toBeVisible();
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic characters", async ({ page }) => {
      await page.locator("#signupName").fill("Алина");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic characters with invalid symbols", async ({
      page,
    }) => {
      await page.locator("#signupName").fill("Алина123");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Name in Cyrrillic and Latin characters ", async ({ page }) => {
      await page.locator("#signupName").fill("АлинаAlina");
      await page.locator("#signupName").blur();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Last Name field validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator(".btn-primary", { name: "Sign up" }).click();
    });
    test("Validation messages for empty Last Name field ", async ({ page }) => {
      await page.locator("#signupLastName").focus();
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name required")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Last Name field(1 digit)", async ({ page }) => {
      await page.locator("#signupLastName").fill("T");
      await page.locator("#signupLastName").blur();
      await expect(
        page.getByText("Last name has to be from 2 to 20 characters long"),
      ).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Last Name field(21 digit)", async ({ page }) => {
      await page.locator("#signupLastName").fill("TiupalovaTiupalovaTiu");
      await page.locator("#signupLastName").blur();
      await expect(
        page.getByText("Last name has to be from 2 to 20 characters long"),
      ).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Last Name field(2 digit)", async ({ page }) => {
      await page.locator("#signupLastName").fill("Al");
      await page.locator("#signupLastName").blur();
      await expect(
        page.getByText("Last name has to be from 2 to 20 characters long"),
      ).not.toBeVisible();
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Last Name field(20 digit)", async ({ page }) => {
      await page.locator("#signupLastName").fill("TiupalovaTiupalovaTi");
      await page.locator("#signupLastName").blur();
      await expect(
        page.getByText("Last name has to be from 2 to 20 characters long"),
      ).not.toBeVisible();
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid characters in Last Name field", async ({ page }) => {
      await page.locator("#signupLastName").fill("Tiupalova123");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Last Name field (complex name with '-'", async ({
      page,
    }) => {
      await page.locator("#signupLastName").fill("Tiupalova-Bondarenko");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).not.toBeVisible();
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid characters in Last Name field (backspace at the beginning and end)", async ({
      page,
    }) => {
      await page.locator("#signupLastName").fill(" Tiupalova ");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).not.toBeVisible();
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic characters", async ({ page }) => {
      await page.locator("#signupLastName").fill("Тюпалова");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic characters with invalid symbols", async ({
      page,
    }) => {
      await page.locator("#signupLastName").fill("Тюпалова123");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Last Name in Cyrrillic and Latin characters ", async ({ page }) => {
      await page.locator("#signupLastName").fill("ТюпаловаTiupalova");
      await page.locator("#signupLastName").blur();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Email field validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator(".btn-primary", { name: "Sign up" }).click();
    });
    test("Validation messages for empty Email field ", async ({ page }) => {
      await page.locator("#signupEmail").focus();
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email required")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format without domain", async ({ page }) => {
      await page.locator("#signupEmail").fill("user@");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format with multiple @ symbols", async ({ page }) => {
      await page.locator("#signupEmail").fill("user@@domain.com");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid Email format without @ symbol", async ({ page }) => {
      await page.locator("#signupEmail").fill("userdomain.com");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid Email format", async ({ page }) => {
      await page.locator("#signupEmail").fill("user@domain.com");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).not.toBeVisible();
      await expect(page.locator("#signupEmail")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Max length of Email field (64 characters in local part)", async ({
      page,
    }) => {
      await page.locator("#signupEmail").fill("a".repeat(63) + "@domain.com");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).not.toBeVisible();
      await expect(page.locator("#signupEmail")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Max length of Email field (about 255 characters in domain part)", async ({
      page,
    }) => {
      await page
        .locator("#signupEmail")
        .fill("user@" + "a".repeat(247) + ".com");
      await page.locator("#signupEmail").blur();
      await expect(page.getByText("Email is incorrect")).not.toBeVisible();
      await expect(page.locator("#signupEmail")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Password field validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator(".btn-primary", { name: "Sign up" }).click();
    });

    test("Validation messages for empty Password field ", async ({ page }) => {
      await page.locator("#signupPassword").focus();
      await page.locator("#signupPassword").blur();
      await expect(page.getByText("Password required")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Password field(8 digit)", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test1234");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).not.toBeVisible();
      await expect(page.locator("#signupPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Password field(7 digit)", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test123");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Valid length of Password field(15 digit)", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test12345678901");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).not.toBeVisible();
      await expect(page.locator("#signupPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Invalid length of Password field(16 digit)", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test123456789012");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without capital letter", async ({ page }) => {
      await page.locator("#signupPassword").fill("test1234");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without small letter", async ({ page }) => {
      await page.locator("#signupPassword").fill("TEST1234");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password without digit", async ({ page }) => {
      await page.locator("#signupPassword").fill("TestTest");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Password with special characters", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test1234!");
      await page.locator("#signupPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).not.toBeVisible();
      await expect(page.locator("#signupPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  test.describe("Repeat Password field validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator(".btn-primary", { name: "Sign up" }).click();
    });
    test("Validation messages for empty Repeat Password field ", async ({
      page,
    }) => {
      await page.locator("#signupRepeatPassword").focus();
      await page.locator("#signupRepeatPassword").blur();
      await expect(page.getByText("Re-enter password required")).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password valid length 8 digits", async ({ page }) => {
      await page.locator("#signupRepeatPassword").fill("Test1234");
      await page.locator("#signupRepeatPassword").blur();
      await expect(
        page.getByText("Re-enter password required"),
      ).not.toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password valid length 15 digits", async ({ page }) => {
      await page.locator("#signupRepeatPassword").fill("Test12345678901");
      await page.locator("#signupRepeatPassword").blur();
      await expect(
        page.getByText("Re-enter password required"),
      ).not.toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password invalid length 7 digits", async ({ page }) => {
      await page.locator("#signupRepeatPassword").fill("Test123");
      await page.locator("#signupRepeatPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password invalid length 16 digits", async ({ page }) => {
      await page.locator("#signupRepeatPassword").fill("Test123456789012");
      await page.locator("#signupRepeatPassword").blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        ),
      ).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    test("Repeat Password does not match Password", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test1234");
      await page.locator("#signupRepeatPassword").fill("Test12345");
      await page.locator("#signupRepeatPassword").blur();
      await expect(page.getByText("Passwords do not match")).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
    test("Repeat Password matches Password", async ({ page }) => {
      await page.locator("#signupPassword").fill("Test1234");
      await page.locator("#signupRepeatPassword").fill("Test1234");
      await page.locator("#signupRepeatPassword").blur();
      await expect(page.getByText("Passwords do not match")).not.toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });
  });
});
//

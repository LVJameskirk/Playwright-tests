import { test, expect } from "@playwright/test";
import { step } from "allure-js-commons";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";

test("toDoMvc test. Add and delete tasks, filtered list", async ({ page }) => {
  await step("Открытие главной страницы", async () => {
    await page.goto("https://demo.playwright.dev/todomvc/");
  });

  await step("Проверка заголовка", async () => {
    const title = await page.title();
    expect(title).toBe("React • TodoMVC");
  });

  const input = page.getByPlaceholder("What needs to be done?");
  await input.fill("Hello Hexlet");
  await input.press("Enter");
  await input.fill("Learning something new");
  await input.press("Enter");

  await page
    .getByRole("listitem")
    .filter({ hasText: "Learning something new" })
    .getByLabel("Toggle Todo")
    .check();
  await expect(page.getByText("Hello Hexlet")).toBeVisible();
  await expect(page.getByText("Learning something new")).toBeVisible();
  await page.getByRole("link", { name: "Active" }).click();
  await expect(page.getByText("Learning something new")).not.toBeVisible();

  const item = page.getByRole("listitem").filter({ hasText: "Hello Hexlet" });
  await item.hover();
  await item.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Hello Hexlet")).not.toBeVisible();

  await allure.attachment("Screenshot", await page.screenshot(), ContentType.PNG);
});

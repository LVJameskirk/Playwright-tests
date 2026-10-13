# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\toDoMvc.spec.ts >> toDoMvc test. Add and delete tasks, filtered list
- Location: tests\e2e\toDoMvc.spec.ts:4:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Example Domain"
Received: "React • TodoMVC"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app." [ref=e3] [cursor=pointer]:
      - /url: https://todomvc.com/
  - generic [ref=e6]:
    - heading "todos" [level=1] [ref=e7]
    - textbox "What needs to be done?" [active] [ref=e8]
  - contentinfo [ref=e9]:
    - paragraph [ref=e10]: Double-click to edit a todo
    - paragraph [ref=e11]:
      - text: Created by
      - link "Remo H. Jansen" [ref=e12] [cursor=pointer]:
        - /url: http://github.com/remojansen/
    - paragraph [ref=e13]:
      - text: Part of
      - link "TodoMVC" [ref=e14] [cursor=pointer]:
        - /url: http://todomvc.com
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { step } from "allure-js-commons";
  3  | 
  4  | test("toDoMvc test. Add and delete tasks, filtered list", async ({ page }) => {
  5  |     await step("Открытие главной страницы", async () => {
  6  |     await page.goto("https://demo.playwright.dev/todomvc/");
  7  |   });
  8  | 
  9  |     await step("Проверка заголовка", async () => {
  10 |     const title = await page.title();
> 11 |     test.expect(title).toBe("Example Domain");
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  12 |   });
  13 | 
  14 |   const input = page.getByPlaceholder("What needs to be done?");
  15 |   await input.fill("Hello Hexlet");
  16 |   await input.press("Enter");
  17 |   await input.fill("Learning something new");
  18 |   await input.press("Enter");
  19 | 
  20 |   await page
  21 |     .getByRole("listitem")
  22 |     .filter({ hasText: "Learning something new" })
  23 |     .getByLabel("Toggle Todo")
  24 |     .check();
  25 |   await expect(page.getByText("Hello Hexlet")).toBeVisible();
  26 |   await expect(page.getByText("Learning something new")).toBeVisible();
  27 |   await page.getByRole("link", { name: "Active" }).click();
  28 |   await expect(page.getByText("Learning something new")).not.toBeVisible();
  29 | 
  30 |   const item = page.getByRole("listitem").filter({ hasText: "Hello Hexlet" });
  31 |   await item.hover();
  32 |   await item.getByRole("button", { name: "Delete" }).click();
  33 |   await expect(page.getByText("Hello Hexlet")).not.toBeVisible();
  34 | });
  35 | 
```
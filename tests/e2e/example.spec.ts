import { test, expect } from '@playwright/test';
import TodoMVCPage from '../../models/TodoMVC';

test("test", async ({ page }) => {
  const todoMvcPage = new TodoMVCPage(page);
  await todoMvcPage.goto();

  const taskName = "Finish Hexlet's course";
  await todoMvcPage.addTodo(taskName);
  await todoMvcPage.addTodo("second todo");
  await todoMvcPage.addTodo("third todo");
  const item = todoMvcPage.getTaskItemByName(taskName);
  await expect(item).toBeVisible();
});
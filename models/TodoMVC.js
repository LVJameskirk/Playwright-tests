export default class TodoMVCPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    // Описываем нужные локаторы
    // Так как реальный поиск происходит во время использования,
    // то мы можем без проблем задать все нужные локаторы прямо в конструкторе
    this.inputForNewTodo = page.getByPlaceholder("What needs to be done?");
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc/");
  }

  getTaskItemByName(taskName) {
    return this.page.getByTestId("todo-title").filter({ hasText: taskName });
  }

  async addTodo(text) {
    await this.inputForNewTodo.fill(text);
    await this.inputForNewTodo.press("Enter");
  }
}
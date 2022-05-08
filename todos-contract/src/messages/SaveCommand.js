// @ts-check

export class SaveCommand {
  /**
   * @param {import("../data").TodoId} todoId
   * @param {string} newTitle
   */
  constructor(todoId, newTitle) {
    this.todoId = todoId;
    this.newTitle = newTitle;
  }
}

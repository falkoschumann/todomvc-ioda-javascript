// @ts-check

export class ToggleCommand {
  /**
   * @param {import("../data").TodoId} todoId
   */
  constructor(todoId) {
    this.todoId = todoId;
  }
}

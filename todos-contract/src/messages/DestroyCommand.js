// @ts-check

export class DestroyCommand {
  /**
   * @param {import("../data").TodoId} todoId
   */
  constructor(todoId) {
    this.todoId = todoId;
  }
}

// @ts-check

/** @typedef {number} TodoId */

export class Todo {
  /**
   * @param {TodoId} id
   * @param {string} title
   * @param {boolean} completed
   */
  constructor(id, title, completed) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    return this;
  }
}

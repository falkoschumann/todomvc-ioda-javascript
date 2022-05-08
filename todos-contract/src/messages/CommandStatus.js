// @ts-check

export class CommandStatus {
  /**
   * @param {boolean} success
   * @param {string=} errorMessage
   */
  constructor(success, errorMessage = undefined) {
    this.success = success;
    this.errorMessage = errorMessage;
  }

  static success() {
    return new CommandStatus(true);
  }

  /**
   * @param {string} errorMessage
   */
  static failure(errorMessage) {
    return new CommandStatus(false, errorMessage);
  }
}

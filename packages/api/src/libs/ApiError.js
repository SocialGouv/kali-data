export default class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} code
   * @param {string=} path
   */
  constructor(message, code, path) {
    super(message);

    this.code = code;
    if (path !== undefined) {
      this.path = path;
    }
  }
}

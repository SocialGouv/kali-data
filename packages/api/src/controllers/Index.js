import pack from "../../../../package.json";
import documentation from "../documentation/index.json";

documentation.info.version = pack.version;

class Index {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000
   *
   * @see https://swagger.io/docs/specification/about/
   */
  get(ctx) {
    ctx.body = documentation;
  }
}

export default new Index();

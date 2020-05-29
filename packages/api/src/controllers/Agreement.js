// @ts-check

import answerWithError from "../helpers/answerWithError";
import ApiError from "../libs/ApiError";
import findAgreements from "../libs/findAgreements";
import getAgreementByIdOrIdcc from "../libs/getAgreementByIdOrIdcc";

class Agreement {
  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/agreement/KALICONT000005635444
   */
  get(ctx) {
    try {
      const { idOrIdcc } = ctx.params;

      const body = getAgreementByIdOrIdcc(idOrIdcc);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/Agreement#get()", err, ctx);
    }
  }

  /**
   * @param {import("koa").Context} ctx
   *
   * @example
   * - http://localhost:3000/agreements
   * - http://localhost:3000/agreements?&query=journalistes
   */
  index(ctx) {
    try {
      const { query } = ctx.query;

      switch (true) {
        case query !== undefined && typeof query !== "string":
          throw new ApiError("When provided, the `query` query parameter must be a {string}.", 422);
      }

      const body = findAgreements(query);

      ctx.body = body;
    } catch (err) {
      answerWithError("controllers/Agreement#index()", err, ctx);
    }
  }
}

export default new Agreement();

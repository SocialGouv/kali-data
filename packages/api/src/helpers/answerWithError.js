// @ts-check

import log from "npmlog";

log.enableColor();

/**
 * @param {string} path
 * @param {?} error
 * @param {import("koa").Context} ctx
 */
export default function answerWithError(path, error, ctx) {
  if (error.code === undefined) {
    error.code = 500;
  }

  const errorMessage =
    typeof error === "object" && typeof error.message === "string"
      ? // https://stackoverflow.com/a/37133017/2736233
        error.message.split("\n", 1)[0]
      : typeof error === "string"
      ? error
      : `Unknown error.`;

  const body = {
    error: errorMessage,
  };

  if (error.code >= 500) {
    log.error("api", `[${error.path || path}] Error: %s`, errorMessage);
    body.message = "Bad Request";
  }

  ctx.throw(error.code, JSON.stringify(body));
}

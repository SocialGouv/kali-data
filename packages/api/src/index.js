import cors from "@koa/cors";
import Koa from "koa";
import log from "npmlog";

import router from "./middlewares/router";

log.enableColor();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT || 3000);

const app = new Koa();
app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
log.info("api", "Listening on %s (%s).", PORT, NODE_ENV);

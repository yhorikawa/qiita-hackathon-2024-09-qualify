import type { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import aiApi from "./ai";

export type Bindings = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/ai", aiApi);

export default api;

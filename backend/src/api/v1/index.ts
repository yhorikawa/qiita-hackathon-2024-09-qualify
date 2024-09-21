import type { D1Database } from "@cloudflare/workers-types/experimental";
import { Hono } from "hono";
import conversationsApi from "./conversations";

export type Bindings = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/conversations", conversationsApi);

export default api;

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
app.post(
  "/conversations/start",
  zValidator("json", z.object({ message: z.string() })), async (c) => {
    const { message } = await c.req.valid("json");

    c.status(201);
    return c.json({ success: true, data: {conversation_id: 1234, ai_response: message} });
  }
);

export default app;

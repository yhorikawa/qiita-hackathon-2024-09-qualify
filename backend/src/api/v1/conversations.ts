import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .post(
    "/start",
    zValidator("json", z.object({ message: z.string() })),
    async (c) => {
      const { message } = await c.req.valid("json");
      const code = crypto.randomUUID();
      await db.createConversation(c.env.DB, { code });

      const conversation = await db.getConversationByCode(c.env.DB, { code });
      if (!conversation) {
        c.status(500);
        return c.json({
          success: false,
          error: "Failed to create conversation",
        });
      }

      await db.createMessage(c.env.DB, {
        conversationId: conversation.id,
        sender: "user",
        message,
      });

      const aiResponse = "Hello! How can I help you today?";
      await db.createMessage(c.env.DB, {
        conversationId: conversation.id,
        sender: "ai",
        message: aiResponse,
      });

      c.status(201);
      return c.json({
        success: true,
        data: { conversation_id: conversation.id, ai_response: aiResponse },
      });
    },
  )

  .post(
    "/:id/ask",
    zValidator("json", z.object({ message: z.string() })),
    zValidator(
      "param",
      z.object({
        id: z
          .string()
          .transform((v) => Number.parseInt(v))
          .refine((v) => !Number.isNaN(v), { message: "not a number" }),
      }),
    ),
    async (c) => {
      const { message } = await c.req.valid("json");
      const { id } = await c.req.valid("param");

      c.status(201);
      return c.json({
        success: true,
        data: { conversation_id: id, ai_response: message },
      });
    },
  );

export default route;

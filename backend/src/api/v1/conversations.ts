import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import { fetchChatGPTResponse } from "../../util/openai";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .get(
    "/:id",
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
      const { id } = await c.req.valid("param");
      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        return c.json({ success: false, error: "Conversation not found" });
      }

      c.status(200);
      return c.json({
        success: true,
        data: { conversation },
      });
    },
  )

  .get(
    "/:id/messages",
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
      const { id } = await c.req.valid("param");
      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        return c.json({ success: false, error: "Conversation not found" });
      }

      const messages = await db.getMessagesByConversationId(c.env.DB, {
        conversationId: conversation.id,
      });

      c.status(200);
      return c.json({
        success: true,
        data: { messages: messages.results },
      });
    },
  )

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

      const conversation = await db.getConversationById(c.env.DB, { id });
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

      const messages = [
        { role: "system", content: systemAskChat },
        {
          role: "user",
          content: message,
        },
      ];
      const response = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        messages,
      );

      await db.createMessage(c.env.DB, {
        conversationId: conversation.id,
        sender: "ai",
        message: response.choices[0].message.content,
      });
      c.status(201);
      return c.json({
        success: true,
        data: {
          conversation_id: id,
          ai_response: response.choices[0].message.content,
        },
      });
    },
  );

export default route;
const systemAskChat = `
  必ず日本語で答えてください。

  あなたは、ドキュメントをまとめるプロです。
  現在ユーザーはドキュメントをまとめるために、質問をしています。
  聞かれた内容を解釈して、気になる点を質問してください。

  回答するのは、質問文だけで良いです。
`;

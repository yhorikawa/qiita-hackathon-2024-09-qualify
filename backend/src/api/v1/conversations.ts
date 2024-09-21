import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type * as model from "../../gen/sqlc/models";
import * as db from "../../gen/sqlc/querier";
import { fetchChatGPTResponse } from "../../util/openai";
import type { Bindings } from "./index";

interface ConversationsResponse {
  success: boolean;
  data: { conversations: model.Conversations[] };
  error: string[];
}

interface ConversationResponse {
  success: boolean;
  data: { conversation: model.Conversations };
  error: string[];
}

interface MessagesResponse {
  success: boolean;
  data: { messages: model.Messages[] };
  error: string[];
}

interface MessageResponse {
  success: boolean;
  data: { message: model.Messages };
  error: string[];
}

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      response.success = true;
      response.data.conversation = conversation;
      c.status(200);
      return c.json(response);
    },
  )

  .get(
    "/:id/messages",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = await c.req.valid("param");

      const response: MessagesResponse = {
        success: false,
        data: { messages: [] },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(404);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      const messages = await db.getMessagesByConversationId(c.env.DB, {
        conversationId: conversation.id,
      });

      response.success = true;
      response.data.messages = messages.results;
      c.status(200);
      return c.json(response);
    },
  )

  .post(
    "/start",
    zValidator("json", z.object({ message: z.string() })),
    async (c) => {
      const { message } = await c.req.valid("json");
      const conversationId = crypto.randomUUID();
      await db.createConversation(c.env.DB, { id: conversationId });

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId,
        sender: "user",
        message,
      });

      const aiResponse = "Hello! How can I help you today?";
      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId,
        sender: "ai",
        message: aiResponse,
      });

      response.success = true;
      response.data.conversation;
      c.status(201);
      return c.json(response);
    },
  )

  .post(
    "/:id/ask",
    zValidator("json", z.object({ message: z.string() })),
    zValidator(
      "param",
      z.object({
        id: z.string().uuid(),
      }),
    ),
    async (c) => {
      const { message } = await c.req.valid("json");
      const { id } = await c.req.valid("param");

      const response: ConversationResponse = {
        success: false,
        data: { conversation: {} as model.Conversations },
        error: [],
      };

      const conversation = await db.getConversationById(c.env.DB, { id });
      if (!conversation) {
        c.status(500);
        response.error.push("Conversation not found");
        return c.json(response);
      }

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
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
      const chatGPTResponse = await fetchChatGPTResponse(
        c.env.OPENAI_API_KEY,
        messages,
      );

      await db.createMessage(c.env.DB, {
        id: crypto.randomUUID(),
        conversationId: conversation.id,
        sender: "ai",
        message: chatGPTResponse.choices[0].message.content,
      });

      response.success = true;
      response.data.conversation = conversation;
      c.status(201);
      return c.json(response);
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

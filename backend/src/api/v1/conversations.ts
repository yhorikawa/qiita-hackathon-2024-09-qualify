import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .post(
    "/start",
    zValidator("json", z.object({ message: z.string() })),
    async (c) => {
      const { message } = await c.req.valid("json");

      c.status(201);
      return c.json({
        success: true,
        data: { conversation_id: 1234, ai_response: message },
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

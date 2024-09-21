import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import * as db from "../../gen/sqlc/querier";
import type { Bindings } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
const route = app
  .get("/", async (c) => {
    const documents = await db.getDocuments(c.env.DB);
    c.status(200);
    return c.json({ success: true, data: { documents: documents.results } });
  })

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
      const document = await db.getDocumentById(c.env.DB, { id });
      if (!document) {
        c.status(404);
        return c.json({ success: false, error: "Document not found" });
      }
      c.status(200);
      return c.json({ success: true, data: { document } });
    },
  );

export default route;

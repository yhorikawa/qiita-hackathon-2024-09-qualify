import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { client } from "#/lib/client";

const Page: NextPage<{ id: string }> = async ({ id }) => {
  const res = await client.api.v1.conversations[":id"]["create-document"].$post({
    param: { id },
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  console.log(data.data.ai_response)
  const document = data.data.ai_response

  return (
    <div>
      {document}
    </div>
  );
};

export default Page;

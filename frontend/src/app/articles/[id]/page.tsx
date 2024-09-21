import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { client } from "#/lib/client";

type PageProps = {
  params: { id: string };
};

const Page: NextPage<PageProps> = async ({ params: { id } }) => {
  const res = await client.api.v1.conversations[":id"]["create-document"].$post(
    {
      param: { id },
    },
  );
  if (!res.ok) return notFound();
  const data = await res.json();
  console.log(data);
  const document = data.data.document.content;

  return <div>{document}</div>;
};

export default Page;

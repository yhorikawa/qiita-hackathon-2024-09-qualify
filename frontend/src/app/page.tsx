import type { NextPage } from "next";
import Link from "next/link";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const res = await client.api.v1.documents.$get();
  if (!res.ok) return null;

  const {
    data: { documents },
  } = await res.json();

  return (
    <>
      {documents.map((document) => (
        <Link
          href={`/articles/${document.id}`}
          key={document.id}
          className="w-full p-3 bg-white m-2 font-bold block"
        >
          <h2>{document.content.substring(0, 15)}...</h2>
          <p>{document.createdAt}</p>
        </Link>
      ))}
    </>
  );
};

export default Page;

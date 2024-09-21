import type { NextPage } from "next";
import { client } from "#/lib/client";

const Page: NextPage = async () => {
  const res = await client.api.v1.$get();
  if (!res.ok) return null;

  const hello = await res.text();
  console.log(hello);

  return (
    <div>
      <h1>{hello} Chat New Page</h1>
    </div>
  );
};

export default Page;

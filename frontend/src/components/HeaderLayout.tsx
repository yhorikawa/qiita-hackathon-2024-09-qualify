import Link from "next/link";

export const HeaderLayout = () => {
  return (
    <header className="bg-slate-200 p-3 flex justify-between mb-3">
      <p className="font-semibold text-sm leading-5">
        なんかサービスロゴ的なもの
      </p>
      <Link
        href="/chat"
        className="font-semibold text-sm leading-5 bg-black text-white p-2"
      >
        AIと壁打ち作成
      </Link>
    </header>
  );
};

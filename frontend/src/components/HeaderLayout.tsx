"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";

export const HeaderLayout = () => {
  const path = usePathname();

  return (
    <header className="bg-white py-2 px-20 flex justify-between items-center">
      <p className="font-semibold text-sm leading-5">
        なんかサービスロゴ的なもの
      </p>
      {path === "/" && (
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-violet-800 text-white py-2 px-4 rounded-md text-lg font-bold leading-relaxed focus:outline-offset-[3px] hover:bg-violet-600">
            記事を作成する
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 focus:bg-violet-50 fover:bg-violet-50">
              <Link href="/new" className="text-base leading-relaxed">
                新規作成
              </Link>
              <ChevronRight className="ml-auto h-6 w-6 opacity-60" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 focus:bg-violet-50 fover:bg-violet-50">
              <Link href="/chat" className="text-base leading-relaxed">
                AIと壁打ち作成
              </Link>
              <ChevronRight className="ml-auto h-6 w-6 opacity-60" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

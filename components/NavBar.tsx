"use client";
import { CardContext } from "@/context/cardContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function NavBar() {
  
  /*@ts-ignore*/
  const { num } = useContext(CardContext);

  return (
    <nav className="w-full h-auto flex justify-between items-center p-8">
      <Link href="/">Home</Link>
      <div className="flex gap-5">
        <Link href="/shop">Shop</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/card" className="flex">
          <ShoppingCart />
          {num > 0 ? (
            <label className="bg-red-600 text-white rounded-full p-1 text-xs absolute top-[20px] right-[35px] z-[-1]">
              {num}
            </label>
          ) : (
            <></>
          )}
        </Link>
      </div>
    </nav>
  );
}

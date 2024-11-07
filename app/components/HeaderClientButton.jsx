"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButton() {
    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    return (
        <div className="flex gap-2 md:gap-4 items-center">
        <Link href={"/favorites"} target="_blank">
        <Badge content={data?.favorites?.length ?? 0} color="danger">
        <button title="favorites" className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60">
          <Heart color="#f43f5e"  size={20}/>
        </button >
        </Badge>
        </Link>
        <Link href={"/cart"} target="_blank">
        <Badge content={data?.carts?.length ?? 0} color="danger">
        <button title="my cart" className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60">
          <ShoppingCart size={20}/>
        </button>
        </Badge>
        </Link>
        </div>
    )
}
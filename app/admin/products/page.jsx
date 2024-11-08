import Link from "next/link";
import ListView from "./components/ListView";

export const metadata = {
    title: "Products",
    description: "Generated by create next app",
  };
export default function Products(){
    return (
        <main className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
            <h1 className="text-xl">Products</h1>
            <Link href="/admin/products/form">
            <button className="button">
                Create
            </button>
            </Link>
            </div>
            <ListView/>
        </main>
    )
}
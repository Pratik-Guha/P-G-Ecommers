import Link from "next/link";
import OrderView from "./components/OrderView";

export const metadata = {
    title: "Orders",
    description: "Generated by create next app",
  };
export default function Products(){
    return (
        <main className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
            <h1 className="text-xl">Orders</h1>
            </div>
            <OrderView />
        </main>
    )
}
"use client"

import { useOrdersCount } from "@/lib/firestore/orders/read_count";
import { useProductCount } from "@/lib/firestore/products/Count/read_client"
import { useUsersCount } from "@/lib/firestore/user/read_count";

export default function Countmeter() {
    const {data:product}=useProductCount();
    const {data:users}=useUsersCount();
    const {data:order}=useOrdersCount();
    const reveneu=order?.totalRevenue/100;
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card title={"Products"} value={product??0} imgURL={"/products.jpg"} />
            <Card title={"Orders"} value={order?.totalOrders??0} imgURL={"/orders.jpg"} />
            <Card title={"Revenues"} value={`₹ ${reveneu ?? 0}`} imgURL={"/profit.jpg"} />
            <Card title={"Customers"} value={users ?? 0} imgURL={"/customers.jpg"} />
        </section>
    )
}

function Card({title,value,imgURL}){
    return (
        <div className="dashboardCard">
            <div className="flex flex-col ">
                <h1 className="text-xl font-semibold">{value}</h1>
                <h2 className="text-sm text-gray-400">{title}</h2>
            </div>
            <div>
                <img src={imgURL} className="h-10"  alt="" />
            </div>
        </div>
    )
}
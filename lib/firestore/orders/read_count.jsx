"use client"

import { db } from "@/lib/firebase"
import {  collection, count, getAggregateFromServer, sum } from "firebase/firestore"
import useSWR from "swr"

export const getOrderCount=async ()=>{
    const ref =collection(db,`orders`)

    const data=await getAggregateFromServer(ref,{
        totalRevenue:sum("payment.amount"),
        totalOrders:count(),
    })
    return data.data();
}

export function useOrdersCount() {
    const {data,error,isLoading}=useSWR("orders_count",(key)=>getOrderCount())
    if(error) {
        console.log(error?.message);
    }
    return {data,error,isLoading}
}
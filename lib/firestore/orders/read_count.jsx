"use client"

import { db } from "@/lib/firebase"
import {  
    collection, 
    count, 
    getAggregateFromServer,
    query, 
    sum,
    where } from "firebase/firestore"
import useSWR from "swr"

export const getOrderCount = async ({ date }) => {
  const ref = collection(db, `orders`);
  let q = query(ref);

  // Ensure `date` is a Date object
  const parsedDate = new Date(date); // Parse date regardless of format
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date passed to getOrderCount"); // Handle invalid dates
  }

  if (date) {
    const fromDate = new Date(parsedDate);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(parsedDate);
    toDate.setHours(23, 59, 59, 999); // Ensure millisecond precision
    q = query(
      q,
      where("timestampCreate", ">=", fromDate),
      where("timestampCreate", "<=", toDate)
    );
  }

  const data = await getAggregateFromServer(q, {
    totalRevenue: sum("payment.amount"),
    totalOrders: count(),
  });

  // Return formatted date along with the data
  if (date) {
    return {
      date: `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`,
      data: data.data(),
    };
  }
  return data.data();
};


const getTotalOrderCount=async (dates)=>{
    let promiseList=[]
    for(let i=0;i<dates?.length;i++){
        const date=dates[i]
        promiseList.push(getOrderCount({date:date}))
    }
    const list=await Promise.all(promiseList)
    return list;
}

export function useOrdersCount() {
    const {data,error,isLoading}=useSWR("orders_count",(key)=>getOrderCount({date:null}))
    if(error) {
        console.log(error?.message);
    }
    return {data,error,isLoading}
}

export function useTotalDayOrderCount({dates}) {
    

    const {data,error,isLoading}=useSWR(
        ["orders_count",dates],
        ([key,dates])=>
        getTotalOrderCount(dates?.sort((a,b)=>a?.getTime()-b?.getTime())),
    )
    if(error) {
        console.log(error?.message);
    }
    return {data,error,isLoading}
}
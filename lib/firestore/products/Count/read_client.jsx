"use client"

import { db } from "@/lib/firebase"
import {  collection, getCountFromServer } from "firebase/firestore"
import useSWR from "swr"

export const getProductCount=async ()=>{
    const ref =collection(db,`products`)

    const data=await getCountFromServer(ref)
    return data.data().count;
}

export function useProductCount() {
    const {data,error,isLoading}=useSWR("products_count",(key)=>getProductCount())
    if(error) {
        console.log(error?.message);
    }
    return {data,error,isLoading}
}
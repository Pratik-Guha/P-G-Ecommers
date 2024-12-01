"use client"

import { db } from "@/lib/firebase"
import {  collection, getCountFromServer } from "firebase/firestore"
import useSWR from "swr"

export const getUserCount=async ()=>{
    const ref =collection(db,`users`)

    const data=await getCountFromServer(ref)
    return data.data().count;
}

export function useUsersCount() {
    const {data,error,isLoading}=useSWR("users_count",(key)=>getUserCount())
    if(error) {
        console.log(error?.message);
    }
    return {data,error,isLoading}
}
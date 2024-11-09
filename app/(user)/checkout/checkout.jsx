"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useProductsById } from "@/lib/firestore/products/read"
import { useUser } from "@/lib/firestore/user/read"
import { CircularProgress } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import Check from "./components/Check"

export default function CheckOut() {
    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    const searchParams=useSearchParams()
    const type=searchParams.get("type")
    const productId=searchParams.get("productId")

    const productIdList=
        type=== "buynow" ? [productId] : data?.carts?.map(item=>item?.id)
    
    const {
        data:products,
        error,
        isLoading
    }=useProductsById({idsList:productIdList})

    if(isLoading){
        return(
            <div>
                <CircularProgress />
            </div>
        )
    }
    if(error){
        return(
            <div>
                <p>{error.message}</p>
            </div>
        )
    }

    if(!productIdList && productIdList?.length===0){
        return(
            <div>
                <p>Product Not Found</p>
            </div>
        )
    }
    const productList=
    type==="buynow"?[
        {
            id:productId,
            quantity:1,
            product:products[0],
        },
    ]:data?.carts?.map(item=>{
        return {
            ...item,
            product:products?.find(e=>e?.id===item?.id)
        }
    })
    return(
        <main className="p-5 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">CheckOut</h1>
            <Check productList={productList} />
        </main>
    )
}
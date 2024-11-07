"use client"
import { ProductCart } from "@/app/components/Products"
import { useAuth } from "@/contexts/AuthContext"
import { useProduct } from "@/lib/firestore/products/read"
import { useUser } from "@/lib/firestore/user/read"



export default function Favorites(){
    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    return (
        <main className="p-5 flex flex-col gap-3 justify-center items-center">
            <h1 className="text-2xl font-semibold">Favorites</h1>
            {
               (data?.favorites|| data?.favorites?.length===0 )&& (
                    <h1 className="text-2xl font-semibold">Add your Favorite Products here</h1>
                )
            }
            <div className="p-5 w-full mf:max-w-[900px] grid grid-cols-1 md:grid-cols-4 gap-3 line-clamp-1">
                {
                    data?.favorites?.map(productId=>{
                        return (
                            <ProductItem productId={productId} key={productId}/>
                        )
                    })
                }
            </div>
        </main>
    )
}

function ProductItem({productId}){
    const {data:product}=useProduct({productId:productId})
    return (
        <ProductCart product={product}/>
    )
}
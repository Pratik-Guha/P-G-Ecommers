"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useUser } from "@/lib/firestore/user/read"
import { updateCarts } from "@/lib/firestore/user/write"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import toast from "react-hot-toast"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/navigation"
export default function AddToCartButton({productId,type}) {

    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    const [isLoading,setIsLoading]=useState(false)
    const router=useRouter()
    const isAdded=data?.carts?.find(item=>item?.id===productId)
    const handlClick=async ()=>{

        setIsLoading(true)
        try {
            if(!user?.uid) {
                router.push("/login")
                throw new Error("Please login first")
            }
            if(isAdded){
                const newList=data?.carts.filter(item=>item?.id!=productId)
                await updateCarts({uid:user.uid,list:newList})
            }else{
                await updateCarts({
                    uid:user?.uid,
                    list:[...(data?.carts  ?? []),{id:productId,quantity:1}]
                })
            }
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }
    if(type==="large"){
        return (
            <Button  
            size="sm" 
            isDisabled={isLoading} 
            onClick={handlClick} 
            isLoading={isLoading} 
            variant="bordered"
            className="h-10 text-xl border-2 rounded-lg border-blue-500 shadow-xl text-blue-500 hover:bg-blue-50 "
            >     
                {isAdded ?   <ShoppingCartIcon />:<AddShoppingCartIcon />}
                {!isAdded ? "Add to Cart" :"Click To Remove"}
            </Button>
        )
    }
   
    return(<Button  
    isIconOnly
    size="sm" 
    isDisabled={isLoading} 
    onClick={handlClick} 
    isLoading={isLoading} 
    variant="solid"
    
    >     
        {isAdded ?   <ShoppingCartIcon />:<AddShoppingCartIcon />}
       
    </Button>)
    
}


{/* <button className="py-3 px-3 shadow-xl text-pink-400 rounded-full border bg-white  hover:text-pink-600">
    <Heart />
</button> */}
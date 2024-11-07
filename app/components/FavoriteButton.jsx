"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useUser } from "@/lib/firestore/user/read"
import { updateFavorites } from "@/lib/firestore/user/write"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import toast from "react-hot-toast"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useRouter } from "next/navigation"
export default function FavoriteButton({productId}) {

    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    const [isLoading,setIsLoading]=useState(false)
    const router=useRouter()
    const handlClick=async ()=>{

        setIsLoading(true)
        try {
            if(!user?.uid) {
                router.push("/login")
                throw new Error("Please login first")
            }
            if(data?.favorites?.includes(productId)){
                const newList=data?.favorites.filter(item=>item!=productId)
                await updateFavorites({uid:user.uid,list:newList})
            }else{
                await updateFavorites({
                    uid:user?.uid,
                    list:[...(data?.favorites  ?? []),productId]
                })
            }
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }
    const isLiked=data?.favorites?.includes(productId)
    return (
        <button 
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={handlClick}
        className="py-2 px-2 shadow-xl text-pink-400 rounded-full border  backdrop-blur-md  "       
        isIconOnly size="sm" >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </button>
    )
}


{/* <button className="py-3 px-3 shadow-xl text-pink-400 rounded-full border bg-white  hover:text-pink-600">
    <Heart />
</button> */}
"use client"
import { ProductCart } from "@/app/components/Products"
import { useAuth } from "@/contexts/AuthContext"
import { useProduct } from "@/lib/firestore/products/read"
import { useUser } from "@/lib/firestore/user/read"
import { updateCarts } from "@/lib/firestore/user/write"
import { Button, CircularProgress } from "@nextui-org/react"
import { Minus, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"



export default function Carts(){
    const {user}=useAuth()
    const {data,isLoading}=useUser({uid:user?.uid})
    if(isLoading){
        return <div className="p-10 flex justify-center w-full">
            <CircularProgress/>
        </div>
    }
    return (
        <main className="p-5 flex flex-col gap-3 justify-center items-center">
            <h1 className="text-2xl font-semibold">Cart Items</h1>{
                (data?.carts?.length===0) && (
                    <div className="flex flex-col p-5 gap-3 justify-center items-center">
                        <div className="flex justify-center ">
                        <img className="h-72" src="/bucket.jpg" alt="Empty"/>
                        </div>
                        <h1 className="text-2xl font-semibold">Add your Cart Items here</h1>
                    </div>
                )
            }
           
            <div className="p-5 w-full mf:max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-3 line-clamp-1">
                {
                    data?.carts?.map(cartItem=>{
                        const productId = cartItem.id;
                        return (
                            <ProductItem productId={cartItem} key={productId}/>
                        )
                    })
                }
            </div>
            <div>
                <Link href="/checkout?type=cart">
                <button className="hmbutton">Checkout</button>
                </Link>
            </div>
        </main>
    )
}

function ProductItem({productId}){
    const {user}=useAuth()
    const {data}=useUser({uid:user?.uid})
    const [isRemoving,setIsRemoving]=useState(false)
    const [isUpdate,setIsUpdate]=useState(false)
    const {data:product}=useProduct({productId:productId?.id})

    const handleRemove=async()=>{
        if(!confirm("Are you sure?")) return;
        setIsRemoving(true)
        try {
            const newList=data?.carts.filter(item=>item?.id!=productId?.id)
            await updateCarts({list:newList,uid:user.uid})
            
        } catch (error) {
            console.log("The  error is like ",error)
            toast.error(error?.message)
        }
        setIsRemoving(false)
    }
    const handleUpdate=async(quantity)=>{
      
        setIsUpdate(true)
        try {
            const newList=data?.carts.map(item=>{
                if(item?.id===productId?.id){
                    return {...item,quantity:parseInt(quantity)}
                }
                return item
            })
            await updateCarts({list:newList,uid:user.uid})
            
        } catch (error) {
            console.log("The  error is like ",error)
            toast.error(error?.message)
        }
        setIsUpdate(false)
    }
    
    return (
        <div className="flex gap-3 items-center border-2 px-3 py-3 rounded-xl">
            <div className="h-14 w-14 p-1">
                <img className="h-full w-full object-cover" src={product?.featureImageURL} alt="" />
            </div>
            <div className="flex flex-col gap-1 w-full">
            <h1>{product?.title}</h1>
            <h1>₹{product?.salePrice}{" "}
                <span className="text-gray-400 text-sm  line-through">₹{product?.price}</span>
            </h1>
            <div className="flex  gap-2 items-center">
            <Button 
                
                onClick={()=>{
                    if(productId?.quantity===1){
                        handleRemove()
                    }else{
                        handleUpdate(productId?.quantity-1)
                    }
                    }
                } 
                isDisabled={isUpdate} 
                isIconOnly color="warning" size="sm" className="h-6 w-4" >
                    <Minus size={14}/>
            </Button>
                <h2>{productId?.quantity}</h2>
            <Button 
                
                onClick={()=>handleUpdate(productId?.quantity+1)} 
                isDisabled={isUpdate} 
                isIconOnly color="success" size="sm" className="h-6 w-4">
                    <Plus  size={14}/>
            </Button>
            </div>
            </div>
            <div className="flex gap-3 items-center ">
                <Button 
                isLoading={isRemoving} 
                onClick={handleRemove} 
                isDisabled={isRemoving} 
                isIconOnly color="danger" size="sm">
                    <X size={14}/>
                </Button>
            </div>
        </div>
    )
}
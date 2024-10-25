"use client"

import { useEffect, useState } from "react"
import BasicDetails from "./components/BasicDetails"
import Images from "./components/Images"
import Description from "./components/Description"
import { Button } from "@nextui-org/react"
import { createNewProduct, updateProduct } from "@/lib/firestore/products/write"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { getProducts } from "@/lib/firestore/products/read_server"

export default function Form(){
    const [data, setData] = useState(null)
    const [featureImage, setFeatureImage] = useState(null)
    const [imageList, setImageList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router=useRouter()

    const searchParams=useSearchParams()
    const id=searchParams.get("id")
    

    const fetchData=async()=>{
        try {
            const res=await getProducts({id:id})
            if(!res){
                throw new Error("No data found")
            }else{
                setData(res)
            }
            
        } catch (error) {
            toast.error(error?.message)
        }
    }

    useEffect(()=>{
        if(id){fetchData()}
    },[id])

    const handleData=(key,value)=>{
        setData((preData)=>{
            return {
                ...(preData ?? {}),
                [key]:value
            }
        })
    }
    const handleCreate=async ()=>{
        setIsLoading(true)
        try {
            await createNewProduct({
                data:data,
                featureImage:featureImage,
                imageList:imageList
            })
            setData(null)
            setFeatureImage(null)
            setImageList([])
            toast.success("Product created successfully")
            router.push("/admin/products")
        } catch (error) {
            toast.error("There is some error to create",error?.message)
        }
        setIsLoading(false)
    }
    const handleUpdate=async ()=>{
        setIsLoading(true)
        try {
            await updateProduct({
                data:data,
                featureImage:featureImage,
                imageList:imageList
            })
            setData(null)
            setFeatureImage(null)
            setImageList([])
            toast.success("Product updated successfully")
            router.push("/admin/products")
        } catch (error) {
            toast.error("There is some error in  submit in image",error?.message)
        }
        setIsLoading(false)
    }
    return (
        <form 
        onSubmit={(e)=>{
            e.preventDefault();
            if(id){
                handleUpdate()
            }else{
                handleCreate();
            }
        }}
            className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
            <h1 className="font-semibold"> { id ? "Update Product":"Create Product"}</h1>
               <Button isLoading={isLoading} isDisabled={isLoading} type="submit" color="primary">{id ? "Update":"Create"}</Button>
            </div>
            <div className="flex gap-5 flex-col md:flex-row">
                <BasicDetails handleData={handleData} data={data}/>
                <div className="flex gap-5 flex-col flex-1 h-full">
                <Images 
                imageList={imageList} setImageList={setImageList} 
                featureImage={featureImage} setFeatureImage={setFeatureImage} 
                data={data}/>
                <Description handleData={handleData} data={data}/>
                </div>
            </div>
        </form>
    )
}
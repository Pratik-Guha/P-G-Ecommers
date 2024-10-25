"use client"


import { getBrand } from "@/lib/firestore/brands/read_server"
import { createNewBrand, updateBrand } from "@/lib/firestore/brands/write"
import { Button } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Form() {

    const [data, setData] = useState(null)
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const searchParams=useSearchParams()
    const id=searchParams.get("id")
    const router=useRouter()
    const fetchData=async ()=>{
        try {
            const res=await getBrand({id:id})
            if(!res){
                toast.error("Brand not found")
            }else{
                setData(res)
            }
        } catch (error) {
            toast.error("There is some error in fetching data",error?.message)
        }
    }
    useEffect(()=>{
        if(id){
            fetchData()
        }
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
            await createNewBrand({data:data,image:image})
            toast.success("Brand created successfully")
            setData(null)
            setImage(null)
        } catch (error) {
            toast.error("There is some error in create Brand",error?.message)
        }
        setIsLoading(false)
    }
    const handleUpdate=async ()=>{
        setIsLoading(true)
        try {
            await updateBrand({data:data,image:image})
            toast.success("Brand updated successfully")
            setData(null)
            setImage(null)
            router.push("/admin/brands")
        } catch (error) {
            toast.error("There is no id to update",error?.message)
        }
        setIsLoading(false)
    }
    return (
        <main className="form">
            <h1 className="font-semibold ">
                {id ? "Update Brand" : "Create Brand"} 
            </h1>
            <form className="gap-2 flex flex-col" 
             onSubmit={e=>{
                 e.preventDefault()
                 if(id){
                     handleUpdate()
                 }else{
                     handleCreate()
                 }
             }}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="brand-image">Image<span className="text-red-500">*</span></label>
                    <div className="flex justify-center items-center p-3">
                    {image && <img src={URL.createObjectURL(image)} alt="image" className="w-32 h-32 rounded-lg"/>}
                    </div>
                    <input type="file" id="brand-image" 
                    name="brand-image"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter image" 
                     onChange={e=>{
                         if(e.target.files.length>0){
                             setImage(e.target.files[0])
                         }
                     }}
                     />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="brand-name">Name<span className="text-red-500">*</span></label>
                    <input type="text" id="brand-name" 
                    name="brand-name"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter name"
                     value={data?.name ?? ""}
                     onChange={e=>{
                        handleData("name",e.target.value)
                     }}
                      />
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading}  type="submit" className="mt-2" >
                {id ?  "Update" : "Create"}
                </Button>
            </form>
        </main>
    )
}
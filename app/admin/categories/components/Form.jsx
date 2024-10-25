"use client"

import { getCategory } from "@/lib/firestore/categories/read_server"
import { createNewCategory, updateCategory } from "@/lib/firestore/categories/write"
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
            const res=await getCategory({id:id})
            if(!res){
                toast.error("Category not found")
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
            await createNewCategory({data:data,image:image})
            toast.success("Category created successfully")
            setData(null)
            setImage(null)
        } catch (error) {
            toast.error("There is some error in crete CAtegory",error?.message)
        }
        setIsLoading(false)
    }
    const handleUpdate=async ()=>{
        setIsLoading(true)
        try {
            await updateCategory({data:data,image:image})
            toast.success("Category updated successfully")
            setData(null)
            setImage(null)
            router.push("/admin/categories")
        } catch (error) {
            toast.error("There is no id to update",error?.message)
        }
        setIsLoading(false)
    }
    return (
        <main className="form">
            <h1 className="font-semibold ">
                {id ? "Update Category" : "Create Category"} 
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
                    <label htmlFor="category-image">Image<span className="text-red-500">*</span></label>
                    <div className="flex justify-center items-center p-3">
                    {image && <img src={URL.createObjectURL(image)} alt="image" className="w-32 h-32 rounded-lg"/>}
                    </div>
                    <input type="file" id="category-image" 
                    name="category-image"
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
                    <label htmlFor="category-name">Name<span className="text-red-500">*</span></label>
                    <input type="text" id="category-name" 
                    name="category-name"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter name"
                     value={data?.name ?? ""}
                     onChange={e=>{
                        handleData("name",e.target.value)
                     }}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="category-slug">Slug<span className="text-red-500">*</span></label>
                    <input type="text" id="category-slug" 
                    name="category-slug"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter slug"
                     value={data?.slug ?? ""}
                     onChange={e=>{
                        handleData("slug",e.target.value)
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
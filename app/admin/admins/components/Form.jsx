"use client"


import { getAdmin } from "@/lib/firestore/admins/read_server"
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write"
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
            const res=await getAdmin({id:id})
            if(!res){
                toast.error("Admin not found")
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
            await createNewAdmin({data:data,image:image})
            toast.success("Admin created successfully")
            setData(null)
            setImage(null)
        } catch (error) {
            toast.error("There is some error in create Admin",error?.message)
        }
        setIsLoading(false)
    }
    const handleUpdate=async ()=>{
        setIsLoading(true)
        try {
            await updateAdmin({data:data,image:image})
            toast.success("Admin updated successfully")
            setData(null)
            setImage(null)
            router.push("/admin/admins")
        } catch (error) {
            toast.error("There is no id to update",error?.message)
        }
        setIsLoading(false)
    }
    return (
        <main className="form">
            <h1 className="font-semibold ">
                {id ? "Update Admin" : "Create Admin"} 
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
                    <label htmlFor="admin-image">Image<span className="text-red-500">*</span></label>
                    <div className="flex justify-center items-center p-3">
                    {image && <img src={URL.createObjectURL(image)} alt="image" className="w-32 h-32 rounded-lg"/>}
                    </div>
                    <input type="file" id="admin-image" 
                    name="admin-image"
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
                    <label htmlFor="admin-name">Name<span className="text-red-500">*</span></label>
                    <input type="text" id="admin-name" 
                    name="admin-name"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter name"
                     value={data?.name ?? ""}
                     onChange={e=>{
                        handleData("name",e.target.value)
                     }}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="admin-email">Email<span className="text-red-500">*</span></label>
                    <input type="email" id="admin-email" 
                    name="admin-email"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter email"
                     value={data?.email ?? ""}
                     onChange={e=>{
                        handleData("email",e.target.value)
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
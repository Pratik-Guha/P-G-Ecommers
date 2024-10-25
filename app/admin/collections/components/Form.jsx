"use client"


import { getCollections } from "@/lib/firestore/collections/read_server"
import { createNewCollection, updateCollection } from "@/lib/firestore/collections/write"
import { useProduct, useProducts } from "@/lib/firestore/products/read"
import { Button } from "@nextui-org/react"
import { X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Form() {

    const [data, setData] = useState(null)
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {data:products}=useProducts({
        pageLimit:1000,
    })
    const searchParams=useSearchParams()
    const id=searchParams.get("id")
    const router=useRouter()
    const fetchData=async ()=>{
        try {
            const res=await getCollections({id:id})
            if(!res){
                toast.error("Collection not found")
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
            await createNewCollection({data:data,image:image})
            toast.success("Collection created successfully")
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
            await updateCollection({data:data,image:image})
            toast.success("Collection updated successfully")
            setData(null)
            setImage(null)
            router.push("/admin/collections")
        } catch (error) {
            toast.error("There is no id to update",error?.message)
        }
        setIsLoading(false)
    }
    return (
        <main className="form">
            <h1 className="font-semibold ">
                {id ? "Update Collection" : "Create Collection"} 
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
                    <label htmlFor="collection-image">Image<span className="text-red-500">*</span></label>
                    <div className="flex justify-center items-center p-3">
                    {image && <img src={URL.createObjectURL(image)} alt="image" className="w-32 h-32 rounded-lg"/>}
                    </div>
                    <input type="file" id="collection-image" 
                    name="collection-image"
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
                    <label htmlFor="collection-name">Title<span className="text-red-500">*</span></label>
                    <input type="text" id="collection-name" 
                    name="collection-name"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter title"
                     value={data?.title ?? ""}
                     onChange={e=>{
                        handleData("title",e.target.value)
                     }}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="collection-sub-title">Sub Title<span className="text-red-500">*</span></label>
                    <input type="text" id="collection-sub-title" 
                    name="collection-sub-title"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     placeholder="Enter sub title"
                     value={data?.subTitle ?? ""}
                     onChange={e=>{
                        handleData("subTitle",e.target.value)
                     }}
                      />
                </div>
                <div className="flex flex-wrap gap-2">
                    {
                        data?.products?.map(productId=>{
                            return (
                                <ProductCart
                                key={productId} 
                                productId={productId} 
                                setData={setData}
                            />
                            )
                        })
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="collection-products">Select Products<span className="text-red-500">*</span></label>
                    <select type="text" id="collection-products" 
                    name="collection-products"
                    className=" border-2 px-4 py-2 rounded-lg w-full focus:outline-none"
                     onChange={e=>{
                        setData((preData)=>{
                            let list=[...(preData?.products ?? [])]
                            list.push(e.target.value)
                            return {
                                ...preData,
                                products:list,

                            }
                        })
                     }}
                    >
                    <option value="">Select Products</option>
                    {
                        products?.map((item)=>{
                            return (
                                <option 
                                disabled={data?.products?.includes(item.id)}
                                key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            )
                        })
                    }
                    </select>
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading}  type="submit" className="mt-2" >
                {id ?  "Update" : "Create"}
                </Button>
            </form>
        </main>
    )
}

function ProductCart({productId ,setData}){
    const {data:product}=useProduct({productId:productId})
    return <div className="flex gap-2 bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
        <h2>{product?.title}</h2>
        <button 
        onClick={(e)=>{
          e.preventDefault()
          setData(prevData=>{
            let list=[...prevData?.products]
            list=list?.filter(item=>item!=productId)
            return{
                ...prevData,
                products:list
            }
          })
        }}
        >
            <X size={12}/>
        </button>
        </div>
}
"use client"

import { useBrands } from "@/lib/firestore/brands/read"
import { useCategories } from "@/lib/firestore/categories/read"

export default function BasicDetails({data,handleData}) {
    const {data:brands}=useBrands()
    const {data:categories}=useCategories()


    return (
        <section className="bg-gray-400 rounded-xl p-4 border-2 flex-1 flex flex-col gap-3">
            <h1 className="font-semibold">Basic Details</h1>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-title" className=" text-sm  ">
                    Product Name <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="text"
                    placeholder="Enter Title" id="product-title" name="product-title"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.title ?? ""}
                    onChange={(e)=>{
                    handleData("title",e.target.value)
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-short-description" className=" text-sm  ">
                    Short Description <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="text"
                    placeholder="Enter Short Description" id="product-short-description" name="product-short-description"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.shortDescription ?? ""}
                    onChange={(e)=>{
                    handleData("shortDescription",e.target.value)
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-brand" className=" text-sm  ">
                    Brand <span className="text-red-500">*</span>
                    </label>
                <select 
                    type="text"
                    id="product-brand" name="product-brand"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.brandId ?? ""}
                    onChange={(e)=>{
                    handleData("brandId",e.target.value)
                    }}
                >
                    <option value="">Select Brand</option>
                    {
                        brands?.map(item=>{
                            return(
                                <option value={item?.id} key={item?.id}>{item?.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-category" className=" text-sm  ">
                    Category <span className="text-red-500">*</span>
                    </label>
                <select 
                    type="text"
                    id="product-category" name="product-category"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.categoryId ?? ""}
                    onChange={(e)=>{
                    handleData("categoryId",e.target.value)
                    }}
                >
                    <option value="">Select Category</option>
                    {
                        categories?.map(item=>{
                            return(
                                <option value={item?.id} key={item?.id}>{item?.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-stock" className=" text-sm  ">
                    Stock <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="number"
                    placeholder="Enter Stock amount" id="product-stock" name="product-stock"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.stock ?? ""}
                    onChange={(e)=>{
                    handleData("stock",e.target.valueAsNumber)
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-price" className=" text-sm  ">
                    Price <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="number"
                    placeholder="Enter Price" id="product-price" name="product-price"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.price ?? ""}
                    onChange={(e)=>{
                    handleData("price",e.target.valueAsNumber)
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-sale-price" className=" text-sm  ">
                   Sale Price <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="number"
                    placeholder="Enter Sale Price" id="product-sale-price" name="product-sale-price"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.salePrice ?? ""}
                    onChange={(e)=>{
                    handleData("salePrice",e.target.valueAsNumber)
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-is-feature-product" className=" text-sm  ">
                   Is Featured Product 
                    </label>
                <select 
                    type="number"
                    id="product-is-feature-product" name="product-is-feature-product"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none"
                    value={data?.isFeatured ? "yes":"no"}
                    onChange={(e)=>{
                    handleData("isFeatured",e.target.value==="yes"? true:false)
                    }}
                >
                    <option value={"no"}>No</option>
                    <option value={"yes"}>Yes</option>
                </select>
            </div>
        </section>
    )
}
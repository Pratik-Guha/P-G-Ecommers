"use client"

import { useState } from "react"

export default function Photos({imageList}) {
    const [selectImage,setSelectImage]=useState(imageList[0])
    if(imageList.length===0){
        return <></>
    }
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-center items-center">
            <img  
            className="md:h-[450px] sm:h-72 h-56 object-cover"
            src={selectImage} alt="" />
            </div>
            <div className="flex gap-3 flex-wrap justify-center items-center">
                {
                    imageList?.map(item=>{
                        return (
                            <div onClick={()=>{setSelectImage(item)}} 
                            className="cursor-pointer p-2  rounded-xl border">
                                <img className="object-cover h-20" src={item} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
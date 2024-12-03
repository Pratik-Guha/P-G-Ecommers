"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const searchParams=useSearchParams()
    const q=searchParams.get("q")
    const router=useRouter()

    useEffect(() => {
        setQuery(q)
    }, [q])
    const handleSubmit=()=>{
        router.push(`/search?q=${query}`)
        router.refresh()
    }
    return(
        <form 
        onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit()
        }}
        className="flex "
        >
            
            <input 
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            type="text" 
            placeholder="Enter product name........."
            className="border-y-2 border-l-2 text-black border-gray-500 dark:border-white  bg-slate-300 px-4 py-2  rounded-l-xl w-full focus:outline-none"

            />
            <button  type="submit" 
            className="bg-blue-500 text-white border-r-2 py-2 px-4  rounded-r-xl hover:bg-blue-600  border-y-2 border-gray-500 dark:border-white">
                <SearchIcon/>
            </button>
        </form>
    )
}
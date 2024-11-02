"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useAdmin } from "@/lib/firestore/admins/read"
import { Avatar } from "@nextui-org/react"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header({ toggleSidebar }) {
    const {user}=useAuth()
    const {data:admin}=useAdmin({email:user?.email})
    const [showInfoBox, setShowInfoBox] = useState(false);

    const handleAvatarClick = () => {
        setShowInfoBox((prev) => !prev);
    };
    console.log(admin)
    
    return (
        <section className="flex  gap-3 border-b border-gray-200 px-4 py-2 fixed w-full top-0 bg-slate-500 z-50">
            <div className="block md:hidden pt-2">
            <button onClick={toggleSidebar}>
            <Menu />
            </button> 
            </div>
            <div className="flex w-full justify-between items-center pr-0 md:pr-[215px]">
            <h1 className="test-xl font-semibold">Dashboard</h1>
            <button onClick={handleAvatarClick}  className="border-2 border-blue-500 rounded-full">
                    <Avatar src={admin?.imageURL} />
                </button>
                {showInfoBox && admin && (
                    <div className="fixed top-16 right-4 w-48 h-52 p-4 bg-gray-500 text-white  shadow-lg rounded-md flex flex-col items-center gap-2 z-50">
                        <div className="border-3 border-blue-500 rounded-full">
                        <img src={admin.imageURL} alt="admin" className="w-[70px] h-[70px] rounded-full" />
                        </div>
                        <h1 className="text-lg font-semibold">{admin.name}</h1>
                        <h2 className="text-sm ">{admin.email}</h2>
                    </div>
                )}
            </div>
        </section>
    )
}
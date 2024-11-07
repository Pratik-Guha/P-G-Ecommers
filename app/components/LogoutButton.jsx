"use client"

import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { LogOut } from "lucide-react"
import toast from "react-hot-toast"

export default function LogoutButton() {
    const { user } = useAuth()

    if(!user) return<></>
    return (
        <button  
        onClick={async()=>{
            if(!confirm("Are you want to log out")) return
            try {
                await toast.promise(
                    signOut(auth),
                    {
                        error: (e)=>e?.message,
                        loading:"Logging Out 🌀",
                        success:"Logged Out Successfully"
                    }
                )
            } catch (error) {
                toast.error(error?.message)
            }
        }}
        className="h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60">
        <LogOut />
        </button>
    )
}

//This would be css class for Logout part -> h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60
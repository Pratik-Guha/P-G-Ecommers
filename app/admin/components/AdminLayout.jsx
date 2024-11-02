
"use client"


import Header from "./Header"
import Sidebar from "./Sidebar"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import ThemeToggleButton from "../toggle"
import { useAuth } from "@/contexts/AuthContext"
import { useAdmin } from "@/lib/firestore/admins/read"
import { Button, CircularProgress } from "@nextui-org/react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"


export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const slidebarRef=useRef(null)
    const pathname=usePathname()
    const {user}=useAuth()
    const {data:admin,error,isLoading}=useAdmin({email:user?.email})
    const toggleSidebar=()=>[
        setIsOpen(!isOpen),
    ]

    useEffect(()=>{
        toggleSidebar()
    },[pathname])

    useEffect(()=>{
        function handleClickOutside(event){
            if(slidebarRef.current && !slidebarRef?.current?.contains(event.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])

    // return <>{JSON.stringify(user)}</>
    if(isLoading){
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <CircularProgress />
            </div>
        )
    }
    if(error){
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <h1 className="text-red-500">{error?.message}</h1>
            </div>
        )
    }

    if(!admin){
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <h1> Your are not an admin</h1>
                <h1>{user?.email}</h1>
                <Button
                    onClick={async()=>{
                        await signOut(auth)
                    }}
                >
                    Logout
                </Button>
            </div>
        )
    }
    return <main className="flex sticky">
        <div className="hidden md:block">
        <Sidebar/>
        </div>
        <div 
        ref={slidebarRef}
        className={`fixed md:hidden transition-all duration-400 ease-in-out z-50
            ${isOpen ? "translate-x-0" : "-translate-x-[220px]"}`}>
        <Sidebar/>
        </div>
        <section className="flex-1 flex flex-col overflow-hidden min-h-screen ">
        <Header toggleSidebar={toggleSidebar}/>
        <section className="flex-1 pt-16">
        <ThemeToggleButton />
        {children}
        </section>
        </section>
        </main>
}
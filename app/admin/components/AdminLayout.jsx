
"use client"


import Header from "./Header"
import Sidebar from "./Sidebar"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import ThemeToggleButton from "../toggle"


export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const slidebarRef=useRef(null)
    const pathname=usePathname()
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
        <ThemeToggleButton />
        <section className="flex-1 pt-16">
        {children}
        </section>
        </section>
        </main>
}
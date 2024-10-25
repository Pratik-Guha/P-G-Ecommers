"use client"

import { Menu } from "lucide-react"

export default function Header({ toggleSidebar }) {
    return (
        <section className="flex  gap-3 border-b border-gray-200 p-4 fixed w-full top-0 bg-slate-500 z-50">
            <div className="block md:hidden">
            <button onClick={toggleSidebar}>
            <Menu />
            </button> 
            </div>
            <h1 className="test-xl font-semibold">Dashboard</h1>
        </section>
    )
}
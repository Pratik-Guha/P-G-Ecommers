"use clinet"

import ThemeToggleButton from "@/app/toggle"
import { auth } from "@/lib/firebase"
import { Button } from "@nextui-org/react"
import { signOut } from "firebase/auth"
import { Box, Dices, icons, Layers3, LayoutDashboard, LogOut, Shapes, ShieldCheck, ShoppingBasket, ShoppingCart, Star, UserRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"

export default function Sidebar() {
    const menuList=[
        {
            name:"Dashboard",
            link:"/admin",
            icon:<LayoutDashboard className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Products",
            link:"/admin/products",
            icon:<Box className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Categories",
            link:"/admin/categories",
            icon:<Layers3 className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Brands",
            link:"/admin/brands",
            icon:<Dices className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Orders",
            link:"/admin/orders",
            icon:<ShoppingCart className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Customers",
            link:"/admin/customers",
            icon:<UserRound className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Reviews",
            link:"/admin/reviews",
            icon:<Star className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Collections",
            link:"/admin/collections",
            icon:<Shapes className="h-5 w-5 font-semibold"/>
        },
        {
            name:"Admins",
            link:"/admin/admins",
            icon:<ShieldCheck className="h-5 w-5 font-semibold"/>
        },
    ]
    return (
        <section className="sidebar">
            <img src="logo.png" className="h-10"/>
            <ul className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
                {
                    menuList?.map((item,key)=>{
                        return ( 
                            <Tab item={item} key={key}/>              
                        )
                    })
                }
            </ul>
            <button  
            onClick={async()=>{
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
            className="button flex items-center gap-2">
                Log Out <LogOut />
            </button>
            {/* <ThemeToggleButton/> */}
        </section>
    )
}

function Tab({item}){
    const pathname=usePathname()
    const  isSelected=pathname===item?.link
    return  <Link href={item.link} key={item.name}>
    <li 
    className={`flex gap-2 px-5 py-2 items-center font-semibold rounded-lg ease-soft-spring transition-all duration-300;
     ${isSelected ? "bg-blue-500 text-white hover:opacity-85" : "text-gray-500"} z-50`}
    >
        {item.icon }
    <button>{item.name}</button>
    </li>
</Link>
}
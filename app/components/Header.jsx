import { Heart, Search, ShoppingCart, UserCircle } from "lucide-react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"
import AuthContextProvider from "@/contexts/AuthContext"
import HeaderClientButton from "./HeaderClientButton"
import AdminButton from "./AdminButton"


export default function Header() {
    const menuList=[
        {
            name:"Home",
            link:"/"
        },
        {
            name:"About",
            link:"/about-us"
        },
        {
            name:"Contact Us",
            link:"/contact-us"
        },
    ]
  return (
    <nav className="nav">
      <Link href={"/"}>
      <img className="md:h-10 h-7" src={"/logo.png"} alt="logo" />
      </Link>
      
      <div className="hidden md:flex gap-3 items-center">
        {
          menuList.map(item=>{
            return (
              <Link href={item.link} key={item.name}>
                <button className="text-base md:text-lg  hover:opacity-60">
                  {item.name}
                </button>
              </Link>
            )
          })
        }
      </div>
      
      <div className="flex gap-2 md:gap-4 items-center">
        <AuthContextProvider>
          <AdminButton/>
        </AuthContextProvider>
        <Link href={"/search"}>
        <button title="search products" className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60">
          <Search size={20}/>
        </button>
        </Link>
        <AuthContextProvider>
        <HeaderClientButton/>
        </AuthContextProvider>
        <Link href={"/account"} target="_blank">
        <button title="my account" className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60">
          <UserCircle size={20}/>
        </button>
        </Link>
        <AuthContextProvider>
        <LogoutButton/>
        </AuthContextProvider>
      </div>
      {/* <Link href={"/login"}>
      <button className="button">Login</button>
      </Link> */}
    </nav>
  )
}

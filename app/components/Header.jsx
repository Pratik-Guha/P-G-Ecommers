import { Heart, Search, ShoppingCart, UserCircle } from "lucide-react"
import Link from "next/link"


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
      <img className="md:h-10 h-7" src={"/logo.png"} alt="logo" />
      
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
      <div className="flex gap-2 items-center">
        <Link href={"/search"}>
        <button title="search products" className="h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60">
          <Search size={20}/>
        </button>
        </Link>
        <Link href={"/favorites"}>
        <button title="favorites" className="h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60">
          <Heart  size={20}/>
        </button>
        </Link>
        <Link href={"/cart"}>
        <button title="my cart" className="h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60">
          <ShoppingCart size={20}/>
        </button>
        </Link>
        <Link href={"/account"}>
        <button title="my account" className="h-5 w-5 flex justify-center items-center rounded-full hover:opacity-60">
          <UserCircle size={20}/>
        </button>
        </Link>
      </div>
      {/* <Link href={"/login"}>
      <button className="button">Login</button>
      </Link> */}
    </nav>
  )
}

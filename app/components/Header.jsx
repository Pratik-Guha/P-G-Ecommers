import Link from "next/link"


export default function Header() {
    const menuList=[
        {
            name:"Home",
            link:"/"
        },
        {
            name:"About Us",
            link:"/about-us"
        },
        {
            name:"Contact Us",
            link:"/contact-us"
        },
    ]
  return (
    <nav className="nav">
      <img className="h-10" src={"logo.png"} alt="logo" />
      <div className="flex gap-4 items-center">
        {
          menuList.map(item=>{
            return (
              <Link href={item.link} key={item.name}>
                <button>{item.name}</button>
              </Link>
            )
          })
        }
      </div>
      <Link href={"/login"}>
      <button className="button">Login</button>
      </Link>
    </nav>
  )
}

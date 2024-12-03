import { Heart, Search, ShoppingCart, UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButton from "./HeaderClientButton";
import AdminButton from "./AdminButton";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  return (
    <nav className="md:py-4 md:px-12 py-3 px-7 border-b border-blue-500 flex justify-between items-center font-semibold sticky top-0 left-0 right-0 bg-opacity-65 backdrop-blur-3xl z-50">
      {/* Logo */}
      <Link href={"/"}>
        <img className="md:h-10 h-7" src={"/logo.png"} alt="logo" />
      </Link>

      {/* Menu Links */}
      <div className="flex relative md:left-0 left-10 md:flex gap-3 items-center">
        {menuList.map((item) => (
          <Link href={item.link} key={item.name}>
            <button className="text-base md:text-lg hover:opacity-60">
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="hidden md:flex gap-2 md:gap-4 items-center">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={"/search"}>
          <button
            title="search products"
            className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60"
          >
            <Search size={20} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButton />
        </AuthContextProvider>
        <Link href={"/account"} target="_blank">
          <button
            title="my account"
            className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60"
          >
            <UserCircle size={20} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Sliding Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 flex flex-col p-5">
          {/* Close Button */}
          <button
            className="self-end mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={20} />
          </button>

          {/* Menu Items */}
          <AuthContextProvider>
            <HeaderClientButton />
          </AuthContextProvider>
          <Link href={"/account"} target="_blank">
            <button
              title="my account"
              className="h-6 w-6 flex justify-center items-center rounded-full hover:opacity-60 mt-2"
            >
              <UserCircle size={20} />
            </button>
          </Link>
          <AuthContextProvider>
            <LogoutButton />
          </AuthContextProvider>
        </div>
      )}
    </nav>
  );
}

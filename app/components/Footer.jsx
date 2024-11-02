import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
             <Link href="/">
            <img src="/logo.png" className="h-10" alt="logo"/>
             </Link>
            <div className="flex flex-col flex-1 md:flex-row justify-end gap-4">
             <div className="flex gap-2 items-center">
                <Phone size={12}  className="text-blue-500"/>
                <h2>+91 123456789</h2>
             </div>
             <div className="flex gap-2 items-center">
                <Mail size={12}  className="text-blue-500"/>
                <h2>m8uJt@example.com</h2>
             </div>
             <div className="flex gap-2 items-center">
                <MapPin  size={12} className="text-blue-500"/>
                <h2>Gobardanga Ichapur</h2>
             </div>
            </div>
            </div>
            <div className="flex justify-center">
                <h3 className="text-xs">@2024 All rights reserved by P&G</h3>
            </div>
        </footer>
    )
}
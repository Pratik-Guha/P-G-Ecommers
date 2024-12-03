import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const socialLinks = [
    {
        name:"Facebook",
        icon:<FacebookIcon />,
        link:"https://www.facebook.com/"
    },
    {
        name:"Twitter",
        icon:<TwitterIcon/>,
        link:"https://twitter.com/"
    },
    {
        name:"Instagram",
        icon:<InstagramIcon/>,
        link:"https://www.instagram.com/"
    },
    {
        name:"github",
        icon:<GitHubIcon />,
        link:"https://github.com/"
    }
]
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
            <div className="flex gap-3">
        {
            socialLinks.map(link=>{
            return (
            <div className="flex gap-2 items-center">
              <Link href={link.link} key={link.name}>
                <button>
                  {link.icon}
                </button>
              </Link>
            </div>
            )
            })
        }
      </div>
        </footer>
    )
}
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import Link from 'next/link'
import React from 'react'
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
export default function ContactUs() {
  return (
    <main className="min-h-screen ">
      <div className="flex flex-col justify-center items-center">
      <div className="p-5 flex flex-col gap-3 justify-center items-center">
        <h1 className="text-2xl font-semibold">Contact Us</h1>
        <div>
            <p>Phone Num:9382974566</p>
            <p>Email:pratikguha2019@gmail.com</p>
            <p>Address:Gobardanga Ichapur</p>
        </div>
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
      </div>
    </main>
  )
}

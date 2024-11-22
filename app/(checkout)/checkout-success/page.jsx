import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ThemeToggleButton from "@/app/toggle";
import Link from "next/link";

export default function Page({searchParams}){
    const checkoutId=searchParams;
    return (
        <main>
        <Header/>
        <ThemeToggleButton/>
        <section className=" min-h-screen gap-4 flex flex-col items-center justify-center">
            <div className="flex justify-center w-full">
            <img src={"https://images.pexels.com/photos/5926431/pexels-photo-5926431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} className="h-72" alt="Empty Cart" />
            </div>
            <h1 className="text-2xl font-semibold">Your Order Placed Successfully</h1>
            <div className="flex items-center gap-4">
                <Link href="/account">
                <button className="hmbutton">Go to Orders Page</button>
                </Link>
                
            </div>
        </section>
        <Footer/>
        </main>
    )
}
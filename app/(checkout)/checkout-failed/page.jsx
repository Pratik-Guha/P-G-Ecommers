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
            <h1 className="text-2xl font-semibold">Checkout Failed</h1>
            <div className="flex items-center gap-4">
                <Link href="/">
                <button className="hmbutton">Shop Now</button>
                </Link>
                <Link href={`/`}>
                <button className="bg-gray-200 text-blue-500 py-2 px-4 md:px-5 rounded-xl hover:bg-gray-300 border-2 border-blue-500 shadow-xl">
                    Retry</button>
                </Link>
            </div>
        </section>
        <Footer/>
        </main>
    )
}
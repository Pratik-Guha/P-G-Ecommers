"use client"

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThemeToggleButton from "../toggle";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <main>
            <Header/>
            <ThemeToggleButton/>
            <AuthContextProvider>
            <UserChecking>
            <section className="min-h-screen">
            {children}
            </section>
            </UserChecking>
            </AuthContextProvider>
            <Footer/>
        </main>
    )
}


function UserChecking({ children }) {
    const { user, isLoading } = useAuth();

    if(isLoading){
        return <div className="flex items-center justify-center h-screen w-screen">
            <CircularProgress />
        </div>
    }
    if (!user) {
        return <div className="flex flex-col gap-3 items-center justify-center h-screen w-screen">
            <h1>Please Login First</h1>
            <Link href="/login">
            <button className="button">
                Login
            </button>
            </Link>
        </div>
    }
    return <>{children}</>;
}
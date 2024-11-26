"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useAdmin } from "@/lib/firestore/admins/read"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function AdminButton() {
    const {user}=useAuth()
    const {data}=useAdmin({email:user?.email})

    if(!data){
        return <></>
    }
    return (
        <Link href={"/admin"} target="_blank">
            <Button size="sm" radius="lg" color="danger" >Admin</Button>
        </Link>
    )
}
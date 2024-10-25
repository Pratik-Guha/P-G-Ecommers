import Link from "next/link";



export default function Dashboard() {
    return (
        <main>
            <h1>Dashboard</h1>
            <Link href={"/admin"}>Admin Panel</Link>
        </main>
    )
}
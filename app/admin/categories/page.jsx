
import Form from "./components/Form"
import ListView from "./components/ListView"

export const metadata = {
    title: "Categories",
    description: "Generated by create next app",
}

export default function Categories() {
    return (
        <main className="p-5 flex flex-col md:flex-row gap-3 ">
            <Form />
            <ListView />
        </main>
    )
}
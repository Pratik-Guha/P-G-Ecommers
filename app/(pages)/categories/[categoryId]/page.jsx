import { ProductCart } from "@/app/components/Products"
import { getCategory } from "@/lib/firestore/categories/read_server"
import { getProductsByCategory } from "@/lib/firestore/products/read_server"

export default async function Page({ params }) {
    const {categoryId}=params
    const products=await getProductsByCategory({categoryId:categoryId})
    const category=await getCategory({id:categoryId})
    return (
        <main className="p-5 md:p-10 w-full flex justify-center">
            <div className="max-w-[900px] flex flex-col gap-5 p-4">
            <h1 className="text-center font-bold text-4xl py-2">
                {category?.name}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 ">
            {
                products.map(item=>{
                    return (
                       <ProductCart product={item} key={item?.id}/>
                    )
                })
            }
                </div>
        </div>
        </main>
    )
}

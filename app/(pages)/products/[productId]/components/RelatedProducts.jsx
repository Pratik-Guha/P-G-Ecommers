import { ProductCart } from "@/app/components/Products"
import { getProductsByCategory } from "@/lib/firestore/products/read_server"

export default async function RelatedProducts({categoryId}){
    const products=await getProductsByCategory({categoryId:categoryId})
    return (
        <div className="w-full flex justify-center">
        <div className="max-w-[900px] flex flex-col gap-5 p-4">
            <h1 className="text-center font-bold text-2xl py-2">Related Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {
                products.map(item=>{
                    return (
                       <ProductCart product={item} key={item?.id}/>
                    )
                })
            }
                </div>
        </div>
        </div>
    )
}
import { ProductCart } from "@/app/components/Products"
import { getCollections } from "@/lib/firestore/collections/read_server"
import { getProducts } from "@/lib/firestore/products/read_server"

export default async function Page({ params }) {

    const {collectionId}=params
    const collection=await getCollections({id:collectionId})

    return (
        <main className="p-5 md:p-10 w-full flex justify-center">
            <div className="max-w-[900px] flex flex-col gap-5 p-4">
            <div className="w-full flex justify-center">
          <img className="h-36" src={collection?.imageURL} alt="" />
        </div>
            <h1 className="text-center font-bold text-4xl py-2">
                {collection?.title}
            </h1>
            <h1 className="text-center  text-xl">
                {collection?.subTitle}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 ">
            {
                collection?.products?.map(productId=>{
                    console.log(productId)
                    return <Product productId={productId} key={productId}/>
                })
            }
            </div>
        </div>
        </main>
    )
}

async function Product({productId}) {
    const product=await getProducts({id:productId})
    return  <ProductCart product={product}/>
}
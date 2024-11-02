import { getBrand } from "@/lib/firestore/brands/read_server"
import { getCategory } from "@/lib/firestore/categories/read_server"
import { Button } from "@nextui-org/react"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function Details({ product }) {
    return (
        <div className="flex flex-col  gap-3 w-full">
            <div className="flex gap-2">
                <AllCategory categoryId={product?.categoryId}/>
                <AllBrand brandId={product?.brandId}/>
            </div>
           <h1 className="text-xl font-semibold md:text-4xl">{product?.title}</h1>
           <h1 className="text-xl line-clamp-2 md:line-clamp-3">{product?.shortDescription}</h1>
           <h3 className="font-bold text-xl">
            ₹ {product?.salePrice}{" "}
            <span className="text-gray-400 text-sm  line-through">₹ {product?.price}</span>
            </h3>
            <div className="flex gap-2 items-center flex-wrap">
                <Button variant="solid" className="border">
                    Buy Now
                </Button>
                <Button variant="bordered" className="border-2">
                    Add To Cart
                </Button>
                <Button isIconOnly className="rounded-full border-2" >
                    <Heart size={20} className="text-red-500"/>
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold">Description</h2>
                <div dangerouslySetInnerHTML={{__html:product?.description??""}}>

                </div>
            </div>
        </div>
    )
}

async function AllCategory({categoryId}){
    const category=await getCategory({id:categoryId})
    return (
        <Link href={`/categories/${categoryId}`}>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full border-2 bg-blue-500">
            <img className="w-6 h-6 rounded-full" src={category?.imageURL} alt="" />
            <h1 className="text-sm font-bold">{category?.name}</h1>
        </div>
        </Link>
        
    )
}


async function AllBrand({brandId}){
    const brand=await getBrand({id:brandId})
    return (
        
        <div className="flex items-center gap-1 px-3 py-1 rounded-full border-2 bg-blue-500">
            <img className=" h-6 rounded-full" src={brand?.imageURL} alt="" />
            <h1 className="text-sm font-bold">{brand?.name}</h1>
        </div>
        
    )
}
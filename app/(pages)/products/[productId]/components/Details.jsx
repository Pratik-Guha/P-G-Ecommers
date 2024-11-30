import AddToCartButton from "@/app/components/AddToCartButton"
import FavoriteButton from "@/app/components/FavoriteButton"
import AuthContextProvider from "@/contexts/AuthContext"
import { getBrand } from "@/lib/firestore/brands/read_server"
import { getCategory } from "@/lib/firestore/categories/read_server"
import { getProductReviewCount } from "@/lib/firestore/products/Count/read"
import { Rating } from "@mui/material"
import { Rat } from "lucide-react"
import Link from "next/link"

export default function Details({ product }) {
    return (
        <div className="flex flex-col  gap-3 w-full">
            <div className="flex gap-2">
                <AllCategory categoryId={product?.categoryId}/>
                <AllBrand brandId={product?.brandId}/>
            </div>
           <h1 className="text-xl font-semibold md:text-4xl">{product?.title}</h1>
           <RatingAVG productId={product?.id}/>
           <h1 className="text-xl line-clamp-2 md:line-clamp-3">{product?.shortDescription}</h1>
           <h3 className="font-bold text-xl">
            ₹ {product?.salePrice}{" "}
            <span className="text-gray-400 text-sm  line-through">₹ {product?.price}</span>
            </h3>
            {
            product?.stock<=(product?.orders ?? 0) && (
                <div className="flex ">
                <h3 className="text-red-500 bg-red-100 p-1 border border-red-500 rounded-lg font-semibold ">
                Out of Stock
                </h3>
            </div>
            )
           }
            <div className="flex gap-3 items-center flex-wrap">
                <AuthContextProvider>
                <Link href={`/checkout?type=buynow&productId=${product?.id}`} target="_blank">
                <button className="hmbutton">Buy Now</button>
                </Link>
                <AddToCartButton productId={product?.id} type={"large"}/>
                <FavoriteButton productId={product?.id} />
                </AuthContextProvider>
            </div>
           {
            product?.stock<=product?.orders && (
                <div className="flex ">
                <h3 className="text-red-500 bg-red-100 p-1 border border-red-500 rounded-lg font-semibold ">
                Out of Stock
                </h3>
            </div>
            )
           }
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

async function RatingAVG({ productId }) {
    const counts=await getProductReviewCount({productId})
    return (
      <div className="flex  items-center gap-1">
      <Rating
        name="product-rating"
        defaultValue={counts?.averageRating ?? 0}
        precision={0.5}
        size="medium"
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "#ccc", // Set empty star color for dark mode
          },
        }}
        readOnly
      />{" "}
      <h1 className="text-lg gap-1">
        {counts?.averageRating ?? 0} & 
        {counts?.totalReviews ?? 0} <span className="text-sm text-gray-400">Reviews</span>
        </h1>
    </div>
    )
  }
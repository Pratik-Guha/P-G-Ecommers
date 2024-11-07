import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="max-w-[900px] flex flex-col gap-5 p-4">
        <h1 className="text-center font-bold text-2xl py-2">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((item) => {
            return <ProductCart product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCart({ product }) {
  return (
    <div className="border-2 p-4 rounded-lg flex flex-col gap-3">
      <div className="relative">
        <img
          className="h-48 w-full object-cover rounded-lg"
          src={product?.featureImageURL}
          alt={product?.title}
        />
        <div className="absolute top-2 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`} target="_blank">
        <h1 className="text-base font-semibold line-clamp-1">
          {product?.title}
        </h1>
      </Link>
      <div className="flex ">
        <h2>
          ₹{product?.salePrice}{" "}
          <span className="text-gray-400 text-sm  line-through">
            ₹{product?.price}
          </span>
        </h2>
      </div>
      <p className="text-sm line-clamp-2 text-gray-400">
        {product?.shortDescription}
      </p>
      <div className="flex  items-center gap-1">
        <Rating
          name="product-rating"
          defaultValue={2.5}
          precision={0.5}
          size="small"
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#ccc", // Set empty star color for dark mode
            },
          }}
          readOnly
        />{" "}
        <h1 className="text-sm">(0)</h1>
      </div>

      <div className="flex justify-between items-center gap-4 w-full">
        <div className="w-full">
        <Link href={`/checkout?type=buynow&producctId=${product?.id}`}>
          <button className="hmbutton">BUY NOW</button>
        </Link>
        </div>

        <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider>
      </div>
    </div>
  );
}

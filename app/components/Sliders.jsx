"use client"
import AuthContextProvider from "@/contexts/AuthContext";
import { Award } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";

export default function FeaturedProductSlider({featuredProducts}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  useEffect(() => {
    const dots = document.querySelectorAll(".slick-dots li button");
    dots.forEach((dot) => {
      dot.classList.add( "dark:bg-gray-800");
    });
  }, []);

  return (
    <div className="overflow-hidden w-screen">
    <Slider {...settings}>
      {
        featuredProducts?.map(product=>{
            // console.log(product)
            return (
                <div key={product?.id}>
                  <div className="sliders">
                    <div className="flex-1 flex gap-4 md:gap-8 flex-col">
                      <h1 className="text-xl flex gap-1 items-center text-blue-400">
                        Latest Deals <Award size={20} className=""/>
                      </h1>
                      <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">
                          <Link href={`/products/${product?.id}`} target="_blank">
                          {product?.title}
                          </Link>
                        </h1>
                        <h1 className="text-base max-w-96 line-clamp-2">
                          {product?.shortDescription}
                        </h1>
                      </div>
                      <AuthContextProvider>
                        <div className="flex items-center gap-4">
                          <Link href={`/checkout?type=buynow&productId=${product?.id}`} target="_blank">
                          <button className="hmbutton">BUY NOW</button>
                          </Link>
                          <AddToCartButton productId={product?.id} type={"large"}/>
                            <FavoriteButton productId={product?.id} />
                        </div>
                      </AuthContextProvider>
                    </div>
                    <div className="justify-center items-center flex">
                        <Link href={`/products/${product?.id}`} target="_blank">
                        <img className="h-80" src={product?.featureImageURL} alt={product?.title}/>
                        </Link>
                    </div>
                </div>
              </div>
            )
        })
      }
    </Slider>
    </div>
  );
}
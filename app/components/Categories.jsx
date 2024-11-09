"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";

export default function Category({categories}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust for mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const dots = document.querySelectorAll(".slick-dots li button");
    dots.forEach((dot) => {
      dot.classList.add( "dark:bg-gray-800");
    });
  }, []);

  return (
    <div className="overflow-hidden p-5 md:p-10 flex flex-col gap-10">
      <div className="flex items-center m-auto">
        <h1 className="text-3xl font-bold">Shop  by Categories</h1>
      </div>
    <Slider {...settings}>
      {
        categories?.map(item=>{
            // console.log(item)
            return (
                <Link href={`/categories/${item?.id}`} target="_blank" key={item?.id}>
                  <div className="px-2" key={item?.name}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className=" rounded-full p-2 bg-blue-500 object-cover border-2 drop-shadow-xl">
                        <img className=" md:h-36 md:w-36 h-28 w-28 object-cover rounded-full" src={item?.imageURL} alt={item?.title}/>
                    </div>
                    <h1 className="font-semibold">{item?.name}</h1>
                  </div>
                </div>
                </Link>

            )
        })
      }
    </Slider>
    </div>
  );
}
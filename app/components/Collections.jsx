"use client"
import { Button } from "@nextui-org/react";
import { Award, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";

export default function Collection({collections}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // speed: 1000,
    // autoplaySpeed: 3000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Adjust for tablets
        settings: {
          slidesToShow: 1,
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
    <div className="overflow-hidden p-5 sm:p-8 md:p-10">
    <Slider {...settings}>
      {
        collections?.map(collection=>{
            // console.log(collection)
            return (
                <div className="px-2 " key={collection?.title}>
                  <div className="sliders2">
                    <div className="flex gap-2 flex-col w-full justify-center items-center text-center md:text-start md:items-start">
                      <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-xl font-bold">{collection?.title}</h1>
                        <h1 className="text-sm md:text-base max-w-96 line-clamp-2">
                          {collection?.subTitle}
                        </h1>
                      </div>
                        <div className="flex gap-3">
                          <button className="hmbutton text-sm md:text-base">
                            <Link href={`/collections/${collection?.id}`} target="_blank">
                              SHOP NOW
                            </Link>
                          </button>
                        </div>
                    </div>
                    <div className="w-full justify-center flex">
                        <img className="sm:h-40 h-20" src={collection?.imageURL} alt={collection?.title}/>
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
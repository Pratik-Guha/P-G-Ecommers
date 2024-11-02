"use client"
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";

export default function Brand({brands}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    // autoplay: true,
    // speed: 1000,
    // autoplaySpeed: 4000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 4,
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
    <Slider {...settings}>
      {
        brands?.map(item=>{
            // console.log(item)
            return (
                <Link href={`/admin`} key={item?.id}>
                  <div className="px-2" key={item?.name}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className=" rounded-full p-2 bg-blue-500 object-cover border-2 drop-shadow-xl">
                        <img className=" md:h-32 md:w-32 h-28 w-28 object-cover rounded-full" src={item?.imageURL} alt={item?.title}/>
                    </div>
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
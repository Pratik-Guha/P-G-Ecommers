"use client";

import { useProduct } from "@/lib/firestore/products/read";
import { useAllReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Rating } from "@mui/material";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReviewAdmin() {
  const { data: reviews } = useAllReviews();
  const [isLoading, setIsLoading] = useState(false);
 
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
 
  return (
    <div className="px-0 md:px-5 rounded-xl flex-col gap-3 flex font-semibold text-xl flex-1">
      <div  className="flex flex-col gap-3 ">
        {reviews?.map((review) => {
          return (
            <ReviewCard review={review} key={review?.id} />
          );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const {data:product}=useProduct({productId:review?.productId})
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async ({  }) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsLoading(true);
    try {
      await deleteReview({
        uid: review?.uid,
        productId: review?.productId,
      });

      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <div key={review?.id} className="flex border-2 rounded-xl p-5 bg-gray-500  gap-4">
              <div className="w-16">
                <Avatar src={review?.photoURL} />
              </div>
              <div className="flex flex-1 flex-col ">
                <div className="flex justify-between gap-3">
                  <div>
                    <h1 className="font-semibold">{review?.displayName}</h1>
                    <Link href={`/products/${review?.productId}`} target="_blank">
                    <h1 className="font-base text-sm">{product?.title}</h1>
                    </Link>
                    <Rating
                      value={review?.rating}
                      readOnly
                      size="small"
                      sx={{
                        "& .MuiRating-iconEmpty": {
                          color: "#ccc", // Set empty star color for dark mode
                        },
                      }}
                    />
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={handleDelete}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    color="danger"
                  >
                    <Trash2 />
                  </Button>
                </div>
                <p className="text-sm">{review?.message}</p>
              </div>
            </div>
  )
}

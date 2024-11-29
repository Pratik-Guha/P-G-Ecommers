"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default  function Reviews({productId}) {
    const {data}=useReviews({productId})
    // console.log(data)

    const [isLoading, setIsLoading] = useState(false);
    const {user}=useAuth()
    const {data:userData}=useUser({uid:user?.uid})
    const handleDelete = async () => {
      if(!confirm("Are you sure you want to delete this review?")) return;
      setIsLoading(true);
      try {
        if(!user){
          throw new Error("Please login first")
        }
        await deleteReview({
           uid:user?.uid,
           productId:productId
        })
        
        toast.success("Review deleted successfully")
      } catch (error) {
        toast.error(error?.message)
      }
      setIsLoading(false);
    };
    return (
        <div className="p-3 flex flex-col rounded-xl border gap-3 w-full">
            <h1 className="text-xl font-semibold text-blue-600 ">Reviews</h1>
            <div className="flex flex-col gap-2 ">
                {
                    data?.map(review=>{
                        return (
                            <div key={review?.id} className="flex  gap-3">
                                <div className="w-16">
                                <Avatar src={review?.photoURL}/>
                                </div>
                                <div className="flex flex-1 flex-col ">
                                    <div className="flex justify-between gap-3">
                                    <div>     
                                    <h1 className="font-semibold">{review?.displayName}</h1>
                                    <Rating value={review?.rating} 
                                    readOnly size="small"  
                                    sx={{
                                        "& .MuiRating-iconEmpty": {
                                          color: "#ccc", // Set empty star color for dark mode
                                        },
                                      }}  />
                                    </div>
                                    {
                                    user?.uid===review?.uid && (
                                        <Button isIconOnly size="sm" variant="flat" onClick={handleDelete} isLoading={isLoading} isDisabled={isLoading} color="danger">
                                            <Trash2/>
                                        </Button>
                                    )
                                    }
                                    </div>
                                    <p className="text-sm">{review?.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
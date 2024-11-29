"use client"

import { useAuth } from "@/contexts/AuthContext";
import { addReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material"
import { Button } from "@nextui-org/react"
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddReview({productId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(4);
    const [message, setMessage] = useState("");
    const {user}=useAuth()
    const {data:userData}=useUser({uid:user?.uid})
    const handleSubmit = async () => {
      setIsLoading(true);
      try {
        if(!user){
          throw new Error("Please login first")
        }
        await addReview({
           displayName:userData?.displayName,
           message:message,
           photoURL:userData?.photoURL,
           productId:productId,
           rating:rating,
           uid:user?.uid
        })
        setMessage("") 
        toast.success("Review added successfully")
      } catch (error) {
        toast.error(error?.message)
      }
      setIsLoading(false);
    };
    return(
        <div className="p-3 flex flex-col rounded-xl border gap-4 w-full">
            <h1 className="text-xl font-semibold text-blue-600">Rate This Product</h1>
            <Rating
            value={rating}
            onChange={(event, newValue) => {
              
              setRating(newValue);
            }}  
            sx={{
                "& .MuiRating-iconEmpty": {
                  color: "#ccc", // Set empty star color for dark mode
                },
              }}
            />
            <textarea 
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            name="text" 
            placeholder="Write your review here..."
            className="w-full border border-lg px-4 py-2 focus:outline-none"/>
            <Button isDisabled={isLoading} isLoading={isLoading} onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}
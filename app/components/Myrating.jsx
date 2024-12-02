"use client"

import { Rating } from "@mui/material"
import { useEffect, useState } from "react";

export default function Myrating({rating}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    })
    if(!visible) return null;
    return (
        <Rating
        name="product-rating"
        defaultValue={rating?.averageRating ?? 0}
        precision={0.5}
        size="medium"
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "#ccc", // Set empty star color for dark mode
          },
        }}
        readOnly
      />
    )
}
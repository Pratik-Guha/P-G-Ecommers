import { db } from "@/lib/firebase"
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore"

export const addReview =async({uid,productId,displayName,photoURL,message,rating})=>{
    const ref=doc(db,`products/${productId}/reviews/${uid}`)

    await setDoc(ref,{
        rating:rating ?? "",
        message:message ?? "",
        productId:productId ?? "",
        displayName:displayName ?? "",
        photoURL:photoURL ?? "",
        uid:uid ?? "",
        timestamp:Timestamp.now(),
    })
}

export const deleteReview =async({uid,productId})=>{
    await deleteDoc(doc(db,`products/${productId}/reviews/${uid}`))
}
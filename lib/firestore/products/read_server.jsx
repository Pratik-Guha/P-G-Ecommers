import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getProducts=async ({id})=>{
    const data=await getDoc(doc(db,`products/${id}`))
    if(data.exists()){
        return data.data()
    }
    else {
        return null
    }
}
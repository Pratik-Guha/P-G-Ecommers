import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, } from "firebase/firestore"

export const getCollections=async ({id})=>{
    const data=await getDoc(doc(
        db,
        `collections/${id}`
    ))
    if(data.exists()){
        return data.data()
    }
    else {
        return null
    }
}
export const getCollection=async ()=>{
    const list = await getDocs(collection(db, "collections"))
;
      return list.docs.map((snap) => snap.data());
}
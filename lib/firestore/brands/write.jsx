import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createNewBrand=async ({data,image})=>{
    if(!image){
        throw new Error("Image is required")
    }
    if(!data?.name){
        throw new Error("Name is required")
    }
   

    const newId=doc(collection(db,`ids`)).id;
    const iamgeRef=ref(storage,`brands/${newId}`)
    await uploadBytes(iamgeRef,image)
    const imageURL=await getDownloadURL(iamgeRef)

    await setDoc(doc(db,`brands/${newId}`) ,{
        ...data,
        id:newId,
        imageURL:imageURL,
        timestampCreate:Timestamp.now()
    })
}
export const updateBrand=async ({data,image})=>{
   
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.id){
        throw new Error("ID is required")
    }

    const Id=data?.id
    let imageURL=data?.imageURL
    if(image){
        const iamgeRef=ref(storage,`brands/${Id}`)
        await uploadBytes(iamgeRef,image)
        imageURL=await getDownloadURL(iamgeRef)
    }

    await updateDoc(doc(db,`brands/${Id}`) ,{
        ...data,
        imageURL:imageURL,
        timestampUpdate:Timestamp.now()
    })
}

export const deleteBrand=async ({id})=>{
    if(!id){
        throw new Error("id is required")
    }
    await deleteDoc(doc(db,`brands/${id}`))
}
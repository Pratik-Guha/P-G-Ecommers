import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createNewCollection=async ({data,image})=>{
    if(!image){
        throw new Error("Image is required")
    }
    if(!data?.title){
        throw new Error("Title is required")
    }
    if(!data?.products || data?.products?.length===0){
        throw new Error("Product is required")
    }

    const newId=doc(collection(db,`ids`)).id;
    const iamgeRef=ref(storage,`collections/${newId}`)
    await uploadBytes(iamgeRef,image)
    const imageURL=await getDownloadURL(iamgeRef)

    await setDoc(doc(db,`collections/${newId}`) ,{
        ...data,
        id:newId,
        imageURL:imageURL,
        timestampCreate:Timestamp.now()
    })
}
export const updateCollection=async ({data,image})=>{
   
    if(!data?.title){
        throw new Error("Title is required")
    }
    if(!data?.products || data?.products?.length===0){
        throw new Error("Product is required")
    }
    if(!data?.id){
        throw new Error("ID is required")
    }

    const Id=data?.id
    let imageURL=data?.imageURL
    if(image){
        const iamgeRef=ref(storage,`collections/${Id}`)
        await uploadBytes(iamgeRef,image)
        imageURL=await getDownloadURL(iamgeRef)
    }

    await updateDoc(doc(db,`collections/${Id}`) ,{
        ...data,
        imageURL:imageURL,
        timestampUpdate:Timestamp.now()
    })
}

export const deleteCollection=async ({id})=>{
    if(!id){
        throw new Error("id is required")
    }
    await deleteDoc(doc(db,`collections/${id}`))
}
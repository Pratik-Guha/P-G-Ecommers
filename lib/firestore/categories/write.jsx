import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createNewCategory=async ({data,image})=>{
    if(!image){
        throw new Error("Image is required")
    }
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.slug){
        throw new Error("Slug is required")
    }

    const newId=doc(collection(db,`ids`)).id;
    const iamgeRef=ref(storage,`categories/${newId}`)
    await uploadBytes(iamgeRef,image)
    const imageURL=await getDownloadURL(iamgeRef)

    await setDoc(doc(db,`categories/${newId}`) ,{
        ...data,
        id:newId,
        imageURL:imageURL,
        timestampCreate:Timestamp.now()
    })
}
export const updateCategory=async ({data,image})=>{
   
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.slug){
        throw new Error("Slug is required")
    }
    if(!data?.id){
        throw new Error("ID is required")
    }

    const Id=data?.id
    let imageURL=data?.imageURL
    if(image){
        const iamgeRef=ref(storage,`categories/${Id}`)
        await uploadBytes(iamgeRef,image)
        imageURL=await getDownloadURL(iamgeRef)
    }

    await updateDoc(doc(db,`categories/${Id}`) ,{
        ...data,
        imageURL:imageURL,
        timestampUpdate:Timestamp.now()
    })
}

export const deleteCategory=async ({id})=>{
    if(!id){
        throw new Error("id is required")
    }
    await deleteDoc(doc(db,`categories/${id}`))
}
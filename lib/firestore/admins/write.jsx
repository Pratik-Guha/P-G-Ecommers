import { db, storage } from "@/lib/firebase"
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createNewAdmin=async ({data,image})=>{
    if(!image){
        throw new Error("Image is required")
    }
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.email){
        throw new Error("Email is required")
    }
   

    const newId=doc(collection(db,`ids`)).id;
    const iamgeRef=ref(storage,`admins/${newId}`)
    await uploadBytes(iamgeRef,image)
    const imageURL=await getDownloadURL(iamgeRef)

    await setDoc(doc(db,`admins/${newId}`) ,{
        ...data,
        id:newId,
        imageURL:imageURL,
        timestampCreate:Timestamp.now()
    })
}
export const updateAdmin=async ({data,image})=>{
   
    if(!data?.name){
        throw new Error("Name is required")
    }
    if(!data?.id){
        throw new Error("ID is required")
    }
    if(!data?.email){
        throw new Error("Email is required")
    }

    const Id=data?.id
    let imageURL=data?.imageURL
    if(image){
        const iamgeRef=ref(storage,`admins/${Id}`)
        await uploadBytes(iamgeRef,image)
        imageURL=await getDownloadURL(iamgeRef)
    }

    if(Id===data?.email){
        await updateDoc(doc(db,`admins/${Id}`) ,{
            ...data,
            imageURL:imageURL,
            timestampUpdate:Timestamp.now()
        })
    }else{
        const newId=data?.email

        await deleteDoc(doc(db,`admins/${Id}`))

        await setDoc(doc(db,`admins/${newId}`) ,{
            ...data,
            id:newId,
            imageURL:imageURL,
            timestampUpdate:Timestamp.now()
        })
    }
}

export const deleteAdmin=async ({id})=>{
    if(!id){
        throw new Error("id is required")
    }
    await deleteDoc(doc(db,`admins/${id}`))
}
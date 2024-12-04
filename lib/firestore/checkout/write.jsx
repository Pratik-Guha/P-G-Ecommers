
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"

export const createCheckoutAndGetURL=async({uid,products,address})=>{
    const checkoutId=doc(collection(db,`ids`)).id;
    const domain = process.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, "");
    const ref = doc(db, `users`, uid, `checkout_sessions`, checkoutId);


    const line_items=[]

    products.forEach((item)=>{
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item?.product?.title?? "",
                    images:[item?.product?.featureImageURL]?? "",
                    description:item?.product?.shortDescription ?? "",
                
                    metadata:{
                        productId:item?.id
                    }
                },
                unit_amount:item?.product?.salePrice*100,
            },
            quantity:item?.quantity?? 1,
        },)
    })
    await setDoc(ref,{
        id:checkoutId,
        payment_method_types:["card"],
        mode:"payment",
        line_items:line_items,
        metadata:{
            checkoutId:checkoutId,
            uid:uid,
            address:JSON.stringify(address),
        },
        
        success_url:`${process.env.NEXT_PUBLIC_DOMAIN}/checkout-success?checkout_id=${checkoutId}`,
        cancel_url:`${process.env.NEXT_PUBLIC_DOMAIN}/checkout-failed?checkout_id=${checkoutId}`,
    })

    await new Promise(res=>setTimeout(res,3000));

    const checkoutSession=await getDoc(ref)

    if(!checkoutSession?.exists()){
        throw new Error("Check out session not created : "+checkoutSession?.data()?.url)
    }

    if(checkoutSession?.data()?.error?.message){
        throw new Error(checkoutSession?.data()?.error?.message)
    }

    const url=checkoutSession?.data()?.url

    if(url){
        return url
    }else{
        await new Promise(res=>setTimeout(res,5000));
        const checkoutSession=await getDoc(ref)
        if(checkoutSession?.data()?.url){
            return checkoutSession?.data()?.url
        }else{
            throw new Error("Check out session not created")
        }
    }
}
export const createCheckoutCODAndGetURL=async({uid,products,address})=>{
    const checkoutId=`cod_${doc(collection(db,`ids`)).id}`;

    const ref = doc(db, `users`, uid, `checkout_sessions_cod`, checkoutId);


    const line_items=[]

    products.forEach((item)=>{
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item?.product?.title?? "",
                    images:[item?.product?.featureImageURL]?? "",
                    description:item?.product?.shortDescription ?? "",
                    metadata:{
                        productId:item?.id
                    }
                },
                unit_amount:item?.product?.salePrice*100,
            },
            quantity:item?.quantity?? 1,
        },)
    })
    await setDoc(ref,{
        id:checkoutId,
        line_items:line_items,
        metadata:{
            checkoutId:checkoutId,
            uid:uid,
            address:JSON.stringify(address),
        },
        createdAt:Timestamp.now(),
    })

    return checkoutId
    
}
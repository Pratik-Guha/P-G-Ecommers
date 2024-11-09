"use client"

import { Button } from "@nextui-org/react"
import confetti from "canvas-confetti"
import { CheckSquare, CheckSquare2, Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Check({productList}){
    const [paymentMethod,setPaymentMethod]=useState("prepaid")
    const [checkBox,setCheckBox]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [address,setAddress]=useState(null)
    const router=useRouter()
    const totalPrice = productList?.reduce((prev, curr) => {
        return prev + curr?.quantity * curr?.product?.salePrice;
      }, 0);
    const handleAddress=(key,value)=>{
        setAddress({
            ... (address ?? {}),
            [key]:value
        })
    }

    const handlePlaceOrder=async()=>{
        setIsLoading(true)
        try {
            if(totalPrice<=0){
                throw new Error("Please add some product to cart")
            }
            if(!address?.fullName || !address?.mobile || !address?.addressLine1 ){
                throw new Error("Please fill all the fields")
            }

            await new Promise(res=>setTimeout(res,2000))
            //Todo
            if(paymentMethod=="prepaid"){
                
            }else{
                
            }
            toast.success("Your order has been placed successfully")
            confetti()
            router.push("/account")
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }
    useEffect(()=>{
        if(checkBox){
            <CheckSquare2 className="text-blue-500" size={20} />
        }else{
            <Square size={20} />
        }
    },[checkBox])
    return(
        <section className="flex flex-col md:flex-row gap-3">
            <section className="border rounded-xl p-4  flex-1 flex flex-col gap-3">
                <h1 className="text-xl font-semibold mb-3">Shipping Address</h1>
                <div className="flex flex-col gap-4">
                    <input type="text"
                        id="fullName"
                        name="fullName"
                        value={address?.fullName ?? ""}
                        onChange={e=>handleAddress("fullName",e.target.value)}
                        placeholder="Enter Your Full Name"
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="tl" 
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={address?.mobile ?? ""}
                        onChange={e=>handleAddress("mobile",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="email" 
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={address?.email ?? ""}
                        onChange={e=>handleAddress("email",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="text" 
                        id="addressLine1"
                        name="addressLine1"
                        placeholder="Enter Address Line 1"
                        value={address?.addressLine1 ?? ""}
                        onChange={e=>handleAddress("addressLine1",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="text"
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="Enter Address Line 2"
                        value={address?.addressLine2 ?? ""}
                        onChange={e=>handleAddress("addressLine2",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="text"
                        id="city"
                        name="city" 
                        placeholder="Enter City"
                        value={address?.city ?? ""}
                        onChange={e=>handleAddress("city",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="text"
                        id="state"
                        name="state"
                        placeholder="State"
                        value={address?.state ?? ""}
                        onChange={e=>handleAddress("state",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <input type="number" 
                        id="pincode"
                        name="pincode"
                        placeholder="Enter Pincode"
                        value={address?.pincode ?? ""}
                        onChange={e=>handleAddress("pincode",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                    <textarea type="text"
                        id="orderNote"
                        name="orderNote"
                        placeholder="Notes about you order, e.g special notes for delivery"
                        value={address?.orderNote ?? ""}
                        onChange={e=>handleAddress("orderNote",e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                    />
                </div>
            </section>
            <div className="flex flex-col gap-3 flex-1">
            <section className="border rounded-xl p-4  flex flex-col gap-3">
                <h1 className="text-xl font-semibold mb-3">Products</h1>
                <div className="flex flex-col gap-3">
                {
                    productList?.map(item=>{
                        return(
                            <div className="flex gap-3 items-center">
                                <img className="w-20 object-cover rounded-lg" src={item?.product?.featureImageURL} alt="" />
                            <div className="flex-1 flex-col flex">
                                <h1>{item?.product?.title}</h1>
                                <h3 className="font-semibold text-xs">
                                    ₹ {item?.product?.salePrice}{" "}
                                    X <span className="text-gray-400 text-sm">
                                        {item?.quantity}</span>
                                </h3>
                            </div>
                            <div>
                            <h3 className="font-semibold text-xs">
                                    ₹ {item?.product?.salePrice * item?.quantity}{" "}
                                    
                                </h3>
                            </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="flex justify-between w-full items-center p-2 font-bold">
                <h1>Total</h1>
                <h1> ₹ {totalPrice} </h1>
                </div>
            </section>
            <section className="border rounded-xl p-4  flex flex-col gap-3">
                <div className="flex flex-col md:flex-row items-center justify-between">
                <h1>Payment Method</h1>
                <div className="flex items-center gap-3">
                <button onClick={()=>setPaymentMethod("prepaid")} className="flex gap-1 items-center text-xs md:text-sm">               
                    {paymentMethod==="prepaid" &&<CheckSquare2 className="text-blue-500" size={20} />}
                    {paymentMethod === "cod" && <Square size={20} />}
                    Prepaid
                </button>
                <button onClick={()=>setPaymentMethod("cod")} className="flex gap-1 items-center text-xs md:text-sm">
                    {paymentMethod==="prepaid" &&<Square size={20} />}
                    {paymentMethod === "cod" && <CheckSquare2 className="text-blue-500" size={20} />}
                    Cash On Delivery
                </button>
                </div>
                </div>
                <div className="flex gap-2 items-center">
                <button className="flex gap-1"
                onClick={()=>{
                    setCheckBox(!checkBox)
                }}
                >
                {checkBox && <CheckSquare2 className="text-blue-500" size={20} />}
                {checkBox === false && <Square size={20} />}
                <h4 className="text-sm">
                    I agree with the {" "}
                    <span className="text-blue-500">Terms and Conditions</span>
                </h4>
                </button>
                </div>
                <Button onClick={handlePlaceOrder} className="w-full" color="primary" isLoading={isLoading} isDisabled={!checkBox}>
                    Place Order
                </Button>
            </section>
            </div>
        </section>

    )
}
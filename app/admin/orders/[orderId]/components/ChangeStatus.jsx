"use client"
import { updateOrderStatus } from "@/lib/firestore/orders/write"
import toast from "react-hot-toast"

export default function ChangeOrderStatus({order}) {

    const handleChangeStatus=async (status)=>{
        try {
            if(!status){
                toast.error("Please select a status")
            }
            await toast.promise(
                updateOrderStatus({id:order?.id,status:status}),{
                    error:(e)=>e?.message,
                    loading:"Updating Status...",
                    success:"Status Updated",
                }
            )
        } catch (error) {
            toast.error(error?.message)
        }
    }
    return (
        <select 
        value={order?.status}
        onChange={(e)=>handleChangeStatus(e.target.value)}
        name="change-order-status"
        className="hmbutton" 
        id="change-order-status">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Order Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
        </select>
    )
}
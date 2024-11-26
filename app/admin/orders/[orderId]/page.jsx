"use client"

import { useOrder } from "@/lib/firestore/orders/read"
import { CircularProgress } from "@nextui-org/react"
import { useParams } from "next/navigation"
import ChangeOrderStatus from "./components/ChangeStatus"

export default function OrderDetails(){
    const {orderId} = useParams()
    const {data:order,isLoading,error}=useOrder({id:orderId})

    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen w-screen">
            <CircularProgress />
          </div>
        );
      }
      if (error) {
        return (
          <div>
            <p>{error}</p>
          </div>
        );
      }

      const totalAmount=order?.checkout?.line_items.reduce((acc,curr)=>{
        return (
            acc+(curr.price_data.unit_amount/100)*curr.quantity
        )
    },0)

    const address=JSON.parse(order?.checkout?.metadata.address ?? "{}")
  return (
   <main className="p-5 flex flex-col gap-3">
    <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold ">Order Details</h1>
        <ChangeOrderStatus order={order}/>
    </div>
     <div key={order?.id} className="flex flex-col gap-2  border rounded-xl p-3">
      <div className="flex justify-between gap-3">
      <div className="flex gap-3">
        <h3 className="border border-blue-500 bg-blue-100 font-semibold text-sm text-blue-500 rounded-lg px-2 py-1 uppercase">
            {order?.paymentMode}
        </h3>
        <h3 className="border border-green-500 bg-green-100 font-semibold text-sm text-green-500 rounded-lg px-2 py-1 uppercase">
            {order?.status ?? "pending"}
        </h3>
        <h3 className="text-green-500">{totalAmount}</h3>
        </div>
        <h3 className="text-gray-500">{order?.timestampCreate.toDate().toString()}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {order?.checkout?.line_items.map((product) => {
          return (
            <div
              className="flex items-center gap-2"
              key={product?.price_data?.product_data?.name}
            >
              <img
                className="h-20 rounded-lg"
                src={product?.price_data?.product_data?.images[0]}
                alt={product?.price_data?.product_data?.name}
              />
              <div>
                <h1>{product?.price_data?.product_data?.name}</h1>
                <h1 className="text-sm text-gray-300">
                  ₹ {product?.price_data?.unit_amount / 100}{" "}
                  <span>X</span>{" "}
                  <span>{product?.quantity?.toString()}</span>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <h1 className="text-2xl font-semibold text-center">Address</h1>
    <div  className="flex flex-col gap-2  border rounded-xl p-3">
        <table>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{address?.fullName}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{address?.mobile}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{address?.email}</td>
            </tr>
            <tr>
              <td>Address Lane1</td>
              <td>{address?.addressLine1}</td>
            </tr>
            <tr>
              <td>Address Lane2</td>
              <td>{address?.addressLine2}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{address?.city}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{address?.state}</td>
            </tr>
            <tr>
              <td>Pincode</td>
              <td>{address?.pincode}</td>
            </tr>
            <tr>
              <td>Order Note</td>
              <td>{address?.orderNote}</td>
            </tr>
          </tbody>
        </table>
    </div>
   </main>
  )
}
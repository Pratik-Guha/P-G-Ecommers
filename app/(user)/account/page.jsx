"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@nextui-org/react";

export default function Account() {
  const { user } = useAuth();
  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

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
  return (
    <main className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {(!orders || orders?.length === 0) && (
        <div className="flex items-center justify-center flex-col gap-3 p-11">
          <div className="flex justify-center ">
            <img className="h-72" src="/bucket.jpg" alt="Empty" />
          </div>
          <h1 className="text-2xl font-semibold">No Orders Found</h1>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {orders?.map((item, index) => {
            const totalAmount=item?.checkout?.line_items.reduce((acc,curr)=>{
                return (
                    acc+(curr.price_data.unit_amount/100)*curr.quantity
                )
            },0)
          return (
            <div key={item?.id} className="flex flex-col gap-2  border rounded-xl p-3">
              <div className="flex justify-between gap-3">
              <div className="flex gap-3">
                <h3>{index+1}</h3>
                <h3 className="border border-blue-500 bg-blue-100 font-semibold text-sm text-blue-500 rounded-lg px-2 py-1 uppercase">
                    {item?.paymentMode}
                </h3>
                <h3 className="border border-green-500 bg-green-100 font-semibold text-sm text-green-500 rounded-lg px-2 py-1 uppercase">
                    {item?.status ?? "pending"}
                </h3>
                <h3 className="text-green-500">{totalAmount}</h3>
                </div>
                <h3 className="text-gray-500">{item?.timestampCreate.toDate().toString()}</h3>
              </div>
              <div>
                {item?.checkout?.line_items.map((product) => {
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
          );
        })}
      </div>
    </main>
  );
}

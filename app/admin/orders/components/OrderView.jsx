"use client";

import { useAllOrders } from "@/lib/firestore/orders/read";
import { useUser } from "@/lib/firestore/user/read";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderView() {
  const [lastSnapDocList, setLastSnapDocList] = useState([]);
  const [pageLimit, setPageLimit] = useState(10);
  const {
    data: orders,
    error,
    isLoading,
    lastSnapDoc,
  } = useAllOrders({
    pageLimit: pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });
  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);
  const handleNextPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };
  const handlePrevPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>There is some error in Listview {error?.message}</div>;
  }
  return (
    <div className="px-0 md:px-5 rounded-xl flex-col gap-3 flex font-semibold text-xl flex-1 w-full overflow-x-auto">
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">
              Customer
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">
              Total Price
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">
              Total Products
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">
              Payment Mode
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">
              Status
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-r rounded-r-lg text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, index) => {
            return (
              <Row
                item={item}
                index={index + lastSnapDocList?.length * pageLimit}
                key={item?.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between py-3">
        <Button
          isDisabled={isLoading || lastSnapDocList?.length === 0}
          onClick={handlePrevPage}
          variant="bordered"
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(e.target.value)}
          className="px-3 py-1 rounded-md bg-gray-400"
          name="perpage"
          id="perpage"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <Button
          isDisabled={isLoading || orders?.length === 0}
          onClick={handleNextPage}
          variant="bordered"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const totalAmount = item?.checkout?.line_items.reduce((acc, curr) => {
    return acc + (curr.price_data.unit_amount / 100) * curr.quantity;
  }, 0);

  const {data:user}=useUser({uid:item?.uid})
  return (
    <tr key={index} className="">
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 text-left ">
        <div className="flex gap-1 itcems-center">
          <div className="flex flex-col">
            <h1>{user?.displayName}</h1>
            <h1 className="text-sm text-gray-600">{user?.email}</h1>
          </div>
        </div>
      </td>

      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 whitespace-nowrap">
        ₹ {totalAmount}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">
        {item?.checkout?.line_items?.length}
      </td>
      <td className="border-y md:border-y-2  bg-gray-400 px-3 py-1 md:py-2">
        <div className="flex">
        <h3 className="border border-blue-500 bg-blue-100 font-semibold text-sm text-blue-500 rounded-lg px-2 py-1 uppercase">
          {item?.paymentMode}
        </h3>
        </div>
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 ">
        <div className="flex">
        <h3 className="border border-green-500 bg-green-100 font-semibold text-sm text-green-500 rounded-lg px-2 py-1 uppercase">
          {item?.status ?? "pending"}
        </h3>
        </div>
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-r rounded-r-lg ">
        <div className="flex gap-2 items-center text-right">
          <Link href={`/admin/orders/${item?.id}`}>
          <Button  variant="faded">
            View
          </Button>  
          </Link>
        </div>
        {/* <button>Delete</button> */}
      </td>
    </tr>
  );
}

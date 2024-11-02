"use client";


import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { BadgeCheck, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const [lastSnapDocList, setLastSnapDocList] = useState([]);
  const [pageLimit, setPageLimit] = useState(10);
  const { data: products, error, isLoading,lastSnapDoc } 
  = useProducts({
    pageLimit:pageLimit,
    lastSnapDoc:
    lastSnapDocList?.length === 0 
    ? null
    :lastSnapDocList[lastSnapDocList?.length-1]
  });
  useEffect(()=>{
    setLastSnapDocList([])
  },[pageLimit])
  const handleNextPage=()=>{
    let newStack=[...lastSnapDocList]
    newStack.push(lastSnapDoc)
    setLastSnapDocList(newStack)
  }
  const handlePrevPage=()=>{
    let newStack=[...lastSnapDocList]
    newStack.pop()
    setLastSnapDocList(newStack)
  }

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
      <table className=" border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 ">Image</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Title</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Price</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Stock</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Orders</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Status</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-r rounded-r-lg text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => 
            {
              return  <Row item={item} index={index +lastSnapDocList?.length*pageLimit } key={item?.id} />
            }
          )}
        </tbody>
      </table>
      <div className="flex justify-between py-3">
        <Button isDisabled={isLoading || lastSnapDocList?.length === 0} onClick={handlePrevPage} variant="bordered">Previous</Button>
        <select 
         value={pageLimit}
         onChange={(e)=>setPageLimit(e.target.value)}
         className="px-3 py-1 rounded-md bg-gray-400" 
         name="perpage" id="perpage">
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <Button isDisabled={isLoading || products?.length === 0} onClick={handleNextPage} variant="bordered">Next</Button>
      </div>
    </div>
  );
}

function Row({ item, index }) {

    const [isDelete,setIsDelete]=useState(false)
    const router=useRouter()
    const handleDelete=async ()=>{
        if(!confirm("Are you sure you want to delete this product?")) return;
        setIsDelete(true)
        try {
            await deleteProduct({id:item?.id})
            toast.success("Product deleted successfully")
        } catch (error) {
            toast.error("there is some error in finding the id u want to delete",error?.message)
        }
        setIsDelete(true)
    }

    const handleUpdate=()=>{
        router.push(`/admin/products/form?id=${item?.id}`)
    }
  return (
    <tr key={index} className="">
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-center">
        <div className="flex justify-center">
          <img
            src={item?.featureImageURL}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 whitespace-nowrap">
        {/* Need to stle the feature image part  */}
      {item?.title}{" "}{item?.isFeatured === true && (
          <span className="featured rounded-full ">
            Featured✅
          </span>
        )}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 whitespace-nowrap">
       {item?.salePrice < item?.price && ( <span className=" text-sm line-through text-gray-500">₹ {item?.price}</span>) } ₹ {item?.salePrice}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.stock}</td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.orders ?? 0}</td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">
       <div className="flex">
       {(item?.stock -(item?.orders ?? 0))<=0 && <div className="px-2 py-1 bg-red-100 text-red-500 font-bold border border-red-400  rounded-md text-sm">Out of Stock</div>}
       {(item?.stock -(item?.orders ?? 0))>0 && <div className="px-2 py-1 bg-green-100 text-green-600 font-bold border border-green-400  rounded-md text-sm">Available</div>}
       </div>
    </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-r rounded-r-lg ">
        <div className="flex gap-2 items-center text-right">
          <Button onClick={handleUpdate} isIconOnly size="sm" color="warning">
            <Edit2 size={13} />
          </Button>
          <Button isIconOnly size="sm" color="danger" onClick={handleDelete} isLoading={isDelete} isDisabled={isDelete}>
            <Trash2 size={13} />
          </Button>
        </div>
        {/* <button>Delete</button> */}
      </td>
    </tr>
  );
}

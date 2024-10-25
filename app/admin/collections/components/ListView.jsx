"use client";


import { useCollections } from "@/lib/firestore/collections/read";
import { deleteCollection } from "@/lib/firestore/collections/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: collections, error, isLoading } = useCollections();

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
    <div className="px-0 md:px-5 rounded-xl flex-col gap-3 flex font-semibold text-xl flex-1">
      <h1 className="text-xl">Collections</h1>
      <table className=" border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 ">Image</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Title</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Products</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-r rounded-r-lg text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((item, index) => 
            {
              return  <Row item={item} index={index} key={item?.id} />
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, index }) {

    const [isDelete,setIsDelete]=useState(false)
    const router=useRouter()
    const handleDelete=async ()=>{
        if(!confirm("Are you sure you want to delete this collection?")) return;
        setIsDelete(true)
        try {
            await deleteCollection({id:item?.id})
            toast.success("Collection deleted successfully")
        } catch (error) {
            toast.error("there is some error in finding the id u want to delete",error?.message)
        }
        setIsDelete(true)
    }

    const handleUpdate=()=>{
        router.push(`/admin/collections?id=${item?.id}`)
    }
  return (
    <tr key={index} className="">
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-center">
        <div className="flex justify-center">
          <img
            src={item?.imageURL}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.title}</td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.products?.length}</td>
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

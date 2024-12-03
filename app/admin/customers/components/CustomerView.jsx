"use client";


import { useUsers } from "@/lib/firestore/user/read";
import { Avatar,  CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CustomerView() {
  const { data: users, error, isLoading } = useUsers();

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
      <table className=" border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 ">Photo</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Name</th>
            <th className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-left">Email</th>
            
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => 
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

    const router=useRouter()
   
  return (
    <tr key={index} className="">
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2 text-center">
        <div className="flex justify-center">
          <Avatar src={item?.photoURL}/>
        </div>
      </td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.displayName}</td>
      <td className="border-y md:border-y-2 bg-gray-400 px-3 py-1 md:py-2">{item?.email}</td>
      
    </tr>
  );
}

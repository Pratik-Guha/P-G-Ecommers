"use client"

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};
export default function Description({data,handleData}) {

    const handleChange=value=>{
         handleData("description",value)
    }
    return (
        <section className="bg-gray-400 rounded-xl flex-1 p-4 border-2 flex flex-col gap-3 h-full">
            <h1 className="font-semibold">Description</h1>
            <ReactQuill
        value={data?.description}
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
        </section>
    )
}


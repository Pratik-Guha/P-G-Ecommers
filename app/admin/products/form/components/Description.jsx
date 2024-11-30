"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function Description({ data, handleData }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      },
    });

    // Set initial content
    quill.clipboard.dangerouslyPasteHTML(data?.description || "");

    // Listen for content changes
    quill.on("text-change", () => {
      handleData("description", quill.root.innerHTML);
    });
  }, [data]);

  return (
    <section className="bg-gray-400 rounded-xl flex-1 p-4 border-2 flex flex-col gap-3 h-full">
      <h1 className="font-semibold">Description</h1>
      <div ref={editorRef} style={{ height: "300px" }} />
    </section>
  );
}


        // <section className="bg-gray-400 rounded-xl flex-1 p-4 border-2 flex flex-col gap-3 h-full">
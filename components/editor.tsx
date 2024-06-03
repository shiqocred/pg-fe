"use client";

import dynamic from "next/dynamic";
import { ComponentType, useEffect, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
let ReactQuill: ComponentType<ReactQuillProps> = () => null;

try {
  const ReactQuillDynamic = dynamic(() => require("react-quill"), {
    ssr: false,
  });
  ReactQuill = ReactQuillDynamic;
} catch (error) {
  console.log(error);
}

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}
const Editor = ({ onChange, value }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return "Loading...";
  }
  return (
    <div className="bg-white rounded-md border-gray-300 border-2">
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={{
          toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ align: [] }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            ["blockquote"],
            ["link"],
            [{ direction: "rtl" }], // text direction

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme

            ["clean"],
          ],
        }}
        className="min-h-[250px]"
      />
    </div>
  );
};

export default Editor;

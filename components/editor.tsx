"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}
const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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

"use client";

import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}
const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="">
      <Suspense fallback={"Loading..."}>
        <ReactQuill theme="bubble" value={value} readOnly />
      </Suspense>
    </div>
  );
};

export default Preview;

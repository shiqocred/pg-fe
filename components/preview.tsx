"use client";

import dynamic from "next/dynamic";
import { ComponentType, Suspense, useEffect, useMemo, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";
let ReactQuill: ComponentType<ReactQuillProps> = () => null;

try {
  const ReactQuillDynamic = dynamic(() => require("react-quill"), {
    ssr: false,
  });
  ReactQuill = ReactQuillDynamic;
} catch (error) {
  console.log(error);
}

interface PreviewProps {
  value: string;
}
const Preview = ({ value }: PreviewProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return "Loading...";
  }
  return (
    <div className="">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default Preview;

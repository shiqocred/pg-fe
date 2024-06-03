"use client";

import dynamic from "next/dynamic";
import { ComponentType, Suspense, useEffect, useMemo, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";
const ReactQuill: ComponentType<ReactQuillProps> = dynamic(
  () => require("react-quill"),
  {
    ssr: false,
  }
);

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

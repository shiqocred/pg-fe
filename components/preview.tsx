"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

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

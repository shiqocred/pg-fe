"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotosProps {
  id: string;
  imageUrl: string | null;
  cabang: string;
}

export const ParallaxScroll = ({
  images,
  className,
  setUrl,
}: {
  images: PhotosProps[] | undefined;
  className?: string;
  setUrl: (data: string) => void;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const third = Math.ceil((images?.length ?? 0) / 3);

  const firstPart = images?.slice(0, third);
  const secondPart = images?.slice(third, 2 * third);
  const thirdPart = images?.slice(2 * third);

  return (
    <div
      className={cn(
        "h-[calc(100vh-68px-20px-38px-40px)] items-start overflow-y-auto w-full",
        className
      )}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-3 items-start max-w-5xl mx-auto gap-2 py-5 px-0"
        ref={gridRef}
      >
        <div className="grid gap-2">
          {firstPart?.map((el, idx) => (
            <motion.button
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              onClick={() => setUrl(el.imageUrl ?? "")}
            >
              <Image
                src={el.imageUrl ?? ""}
                className="w-full aspect-[5/8] object-cover object-left-top rounded gap-2 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.button>
          ))}
        </div>
        <div className="grid gap-2">
          {secondPart?.map((el, idx) => (
            <motion.button
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              onClick={() => setUrl(el.imageUrl ?? "")}
            >
              <Image
                src={el.imageUrl ?? ""}
                className="w-full aspect-[5/8] object-cover object-left-top rounded gap-2 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.button>
          ))}
        </div>
        <div className="grid gap-2">
          {thirdPart?.map((el, idx) => (
            <motion.button
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              onClick={() => setUrl(el.imageUrl ?? "")}
            >
              <Image
                src={el.imageUrl ?? ""}
                className="w-full aspect-[5/8] object-cover object-left-top rounded gap-2 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

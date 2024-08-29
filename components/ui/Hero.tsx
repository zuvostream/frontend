'use client';
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-semibold">
        Preserve the Future of{' '}<span className="font-bold">Your</span>{' '}Music
        </h1>
        <motion.div 
          initial={{
            x: 0,
            y: 60,
            scale: 1,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 100,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        className="pt-8">
        <Image className="rounded-2xl shadow-2xl border border-primary shadow-primary" src={'/library.png'} height="1920" width="1080" alt="" />
</motion.div>
      </div>
    </MaxWidthWrapper> 
  )
}

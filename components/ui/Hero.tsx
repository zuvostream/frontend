'use client';
import MaxWidthWrapper from "./MaxWidthWrapper";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-semibold">
          Capture Every {' '}
          <motion.span
            initial={{ y: -36 }}
            animate={{ 
              y: 0,
              transition: { 
                duration: 1, 
                ease: "easeInOut" 
              }
            }}
            className="inline-block"
          >
            Note
          </motion.span> 
         {' '} You Play
        </h1>
      </div>
    </MaxWidthWrapper> 
  )
}

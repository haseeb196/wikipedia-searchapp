import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Wkit = ({ title, page, desc }) => {
  return (
    <Link
      href={page}
      target="_blank"
      className="flex flex-row  hover:translate-y-[-2px] py-6"
    >
      <motion.div
        animate={{ y: 0, opacity: 1 }} 
        initial={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="bg-white  flex flex-col  gap-2 pt-2  rounded-2xl  pb-2 pr-32  flex-1 pl-6 flex-wrap"
      >
        <h1 className="uppercase md:text-[21px] sm:text-[18px] font-semibold sm:max-w-[170px] md:max-w-[350px] overflow-hidden text-ellipsis">
          {title}
        </h1>
        <p className="text-gray-500 sm:max-w-[230px] md:max-w-[310px]   sm:overflow-hidden   sm:text-ellipsis sm:whitespace-nowrap capitalize ">
          {desc}
        </p>
      </motion.div>
    </Link>
  );
};

export default Wkit;

import React from "react";
import { BoxBtn } from "../buttons/BoxBtn";
import Image from "next/image";
import ZapSearch from "./ZapSearch";

const MyZapUtils = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold font-mono text-3xl">Zaps</h1>
        <div className="flex gap-4">
          <div className="flex items-center text-sm px-5 gap-1 hover:rounded-sm hover:shadow-md hover:animate-pulse hover:bg-purple-100">
            <Image src={"trashIcon.svg"} width={24} height={24} alt="+"/>
            <h1 className="font-semibold">Trash</h1>
          </div>
            <BoxBtn name={`${"+ "}Create`} path="zap/create" className="text-sm text-white  bg-purple-600 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500" />
        </div>
      </div>
      <div className="flex mt-4">
        <ZapSearch/>
        {/* <ZapOwn/>
        <ZapFilter/> */}
      </div>
    </div>
  );
};

export default MyZapUtils;

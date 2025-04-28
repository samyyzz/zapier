import Image from "next/image";
import React from "react";

const ZapSearch = () => {
  return (
    <div className="flex justify-center items-center border-2 border-gray-300 rounded-md">
      <div className="pl-2 pr-1 ">
        <Image src={"searchIcon.svg"} alt="search" width={16} height={16} />
      </div>
      <input
        type="text"
        placeholder="Search by name or webhook"
        className="p-2 w-64 h-8 outline-0"
      />
    </div>
  );
};

export default ZapSearch;
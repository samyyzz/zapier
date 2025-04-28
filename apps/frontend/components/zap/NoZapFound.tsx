import Image from "next/image";
import React from "react";
import { BoxBtn } from "../buttons/BoxBtn";

export const NoZapFound = () => {
  return (
    <>
      <Image
        src={"thunderIcon.svg"}
        width={36}
        height={36}
        alt="$"
        className="mb-5"
      />
      <h1 className="font-bold text-lg md:text-xl">
        You haven't created a Zap yet
      </h1>
      <p className="text-gray-600">
        Build automated workflows by creating your first Zap.
      </p>
      <div className="flex flex-col md:flex-row mt-8 gap-3">
        <BoxBtn
          name="Explore Templates"
          path="zap/templates"
          icon="templatesIcon.svg"
          className="bg-white hover:bg-gray-100 border border-gray-300"
        />
        <BoxBtn
          name="+ Create Zap"
          path="zap/create"
          className="text-white  bg-purple-400 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500"
        />
      </div>
    </>
  );
};

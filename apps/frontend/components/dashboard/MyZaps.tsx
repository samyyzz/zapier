"use client";
import React from "react";
import useZap from "@/hooks/useZap";
import { NoZapFound } from "../zap/NoZapFound";
import { ZapTable } from "../zap/ZapTable";

const MyZaps = () => {
  const { loading, zaps } = useZap();
  return (
    <div>
      <div className="px-4 text-sm text-center flex flex-col justify-center items-center bg-orange-50 h-96 rounded-xl">
        {zaps ? <ZapTable zaps={zaps} /> : <NoZapFound />}
      </div>
    </div>
  );
};

export default MyZaps;

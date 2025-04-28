import React from "react";
import { PrimaryBtn } from "../buttons/PrimaryBtn";

export interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  actions: [
    {
      id: string;
      typeId: string;
      zapId: string;
      sortingOrder: number;
      type: {
        id: string;
        name: string;
      };
    },
  ];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
    };
  };
}

export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
  return (
    <div className="w-full flex flex-col justify-start h-full text-xs md:text-sm">
      <div className="flex border-b py-2 border-gray-300">
        <div className="flex-2 font-bold text-start">zapId</div>
        <div className="flex-1 font-bold text-start">Apps</div>
        <div className="flex-1 font-bold text-start">Last modified</div>
        <div className="flex-1 font-bold text-start">Status</div>
        <div className="flex-1 font-bold text-start">Check</div>
      </div>
      <div className="flex-1">
        {zaps &&
          zaps.map((zap) => (
            <>
              <div className="flex-2 text-start">{zap.id}</div>
              <div className="flex-1 text-start">
                {zap.trigger.type.name}
                {zap.actions.map((action) => action.type.name + " ")}
              </div>
              <div className="flex-1 text-start">Date</div>
              <div className="flex-1 text-start">
                <PrimaryBtn name="Go" path={`zap/${zap.id}`} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

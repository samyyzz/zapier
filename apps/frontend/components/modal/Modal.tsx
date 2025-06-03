"use client";

import Image from "next/image";
import React from "react";

export interface ZapCellModal {
  index: number | null;
  onSelect: (props: SelectedModal | null) => void;
  availableItems: AvailableItem[];
}

export interface AvailableItem {
  id: string;
  name: string;
  icon: string;
}

export interface SelectedModal {
  index?: number | null;
  id: string;
  name: string;
}

const Modal = ({ index, onSelect, availableItems }: ZapCellModal) => {
  return (
    <div className="fixed top-10 w-full h-screen bg-transparent flex justify-center items-start">
      <div className="flex flex-col justify-start m-4 p-8 z-50 bg-slate-50 h-2/4 w-3/4 md:h-2/4 md:w-2/4 rounded-4xl shadow-xl">
        <div
          onClick={() => {
            onSelect(null);
          }}
          className="flex justify-between pb-2"
        >
          <div className="text-md md:text-lg font-bold">
            Select {index == 1 ? "Trigger" : "Action"}
          </div>

          <div className="-mt-10 -mr-10">
            <Image
              src={"/crossIcon.svg"}
              alt="+"
              width={32}
              height={32}
              className="hover:shadow-md hover:shadow-purple-500 bg-slate-50 border-2 border-dashed border-black rounded-full"
            />
          </div>
        </div>
        <div className="mb-5 w-3/4">
          <input
            placeholder="Search your actions/trigger"
            className="p-1 pl-3 border border-gray-300 rounded-md w-full outline-none text-gray-600"
          />
        </div>
        <div className="m-4 flex flex-col gap-2">
          {availableItems?.length &&
            availableItems.map(({ id, name, icon }) => (
              <div
                onClick={() => onSelect({ id, name })}
                key={name}
                className="flex gap-2 text-sm bg-amber-50 rounded-md shadow-sm font-semibold font-mono w-1/3 hover:bg-blue-100 p-2"
              >
                <Image src={icon} alt="icon" width={20} height={20} />
                {name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

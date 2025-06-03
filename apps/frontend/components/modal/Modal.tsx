"use client";

import Image from "next/image";
import React, { useState } from "react";
import EmailSelector from "./EmailSelector";
import SolanaSelector from "./SolanaSelector";

export interface ZapCellModal {
  index: number | null;
  onSelect: (props: SelectedModal | null) => void;
  availableItems: AvailableItem[];
}

export interface AvailableItem {
  id: string;
  name: string;
  icon: string;
  metadata: any;
}

export interface SelectedModal {
  index?: number | null;
  id: string;
  name: string;
  metadata?: any;
}

const Modal = ({ index, onSelect, availableItems }: ZapCellModal) => {
  const isTrigger = index == 1;

  const [step, setStep] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<SelectedModal | null>(
    null
  );

  const afterSelectingModal = ({ id, name }: SelectedModal) => {
    setStep((s) => s + 1);
    setSelectedAction({
      id,
      name,
    });
  };
  console.log("selectedAction:", selectedAction);
  console.log("selectedAction metadata:", selectedAction?.metadata);

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
        {!selectedAction && (
          <div className="mb-5 w-3/4">
            <input
              placeholder="Search your actions/trigger"
              className="p-1 pl-3 border border-gray-300 rounded-md w-full outline-none text-gray-600"
            />
          </div>
        )}
        <div className="m-4 flex flex-col gap-2">
          {step === 1 && selectedAction?.id == "act01" && (
            <EmailSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  metadata,
                });
                console.log("selectedAction metadata :", selectedAction);
              }}
            />
          )}
          {selectedAction?.metadata}
          {step === 1 && selectedAction?.id == "act02" && (
            <SolanaSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  metadata,
                });
              }}
            />
          )}
          {step === 0 &&
            availableItems?.length &&
            availableItems.map(({ id, name, icon }) => (
              <div
                key={name}
                className="w-full flex gap-2 text-sm bg-blue-100 hover:bg-blue-200 rounded-md shadow-sm font-semibold font-mono p-2"
                onClick={() => {
                  if (isTrigger) {
                    onSelect({ id, name, metadata: {} });
                    afterSelectingModal({ id, name });
                  }
                }}
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

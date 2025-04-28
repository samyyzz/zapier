"use client";
import AddCellBtn from "@/components/zap/AddCellBtn";
import ZapCell from "@/components/zap/ZapCell";
import React, { useState } from "react";

export interface UserSelectedAction {
  name: string;
  actionId: string;
}

const page = () => {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<UserSelectedAction[]>(
    []
  );
  return (
    <div className="pt-20 flex flex-col gap-5 justify-start items-center min-h-screen bg-stone-100">
      <ZapCell
        boxType="Trigger"
        index={1}
        name={
          selectedTrigger
            ? selectedTrigger
            : "Select the event that starts your zap"
        }
      />
      {selectedActions.map((action, index) => (
        <ZapCell
          key={Math.random()}
          boxType="Action"
          index={1 + (1 + index)}
          name={action ? action.name : "Action"}
        />
      ))}
      <AddCellBtn
        onClick={() => {
          setSelectedActions((a) => [
            ...a,
            {
              name: "",
              actionId: "",
            },
          ]);
          console.log("selectedActions :", selectedActions);
        }}
      />
    </div>
  );
};

export default page;

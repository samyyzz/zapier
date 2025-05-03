"use client";

import Modal, { SelectedModal } from "@/components/modal/Modal";
import AddCellBtn from "@/components/zap/AddCellBtn";
import ZapCell from "@/components/zap/ZapCell";
import { useAvailableActionsAndTriggers } from "@/hooks/useAvailableActionsAndTriggers";
import React, { useState } from "react";

export interface UserSelectedAction {
  name: string;
  actionId: string;
  index: number;
}

export interface UserSelectedTrigger {
  name: string;
  triggerId: string;
}

const page = () => {
  const { availableActions, availableTriggers, loading } =
    useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] =
    useState<UserSelectedTrigger | null>(null);
  const [selectedActions, setSelectedActions] = useState<UserSelectedAction[]>(
    []
  );
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  );

  const handleModelSelect = (props: null | SelectedModal) => {
    if (!selectedModalIndex) {
      console.log("no index found : selectedModalIndex");
      return;
    }
    if (selectedModalIndex == null) {
      setSelectedModalIndex(null);
      return;
    }
    if (!props) {
      setSelectedModalIndex(null);
      return;
    } else if (selectedModalIndex == 1) {
      setSelectedTrigger({
        name: props?.name,
        triggerId: props?.id,
      });
      setSelectedModalIndex(null);
    } else {
      setSelectedActions((a) => {
        let newActions = [...a];
        newActions[selectedModalIndex! - 2] = {
          name: props.name,
          actionId: props.id,
          index: selectedModalIndex,
        };
        return newActions;
      });
      setSelectedModalIndex(null);
    }
  };
  return (
    <div className="pt-20 flex flex-col gap-5 justify-start items-center min-h-screen bg-stone-100">
      <ZapCell
        onClick={() => setSelectedModalIndex(1)}
        boxType="Trigger"
        index={1}
        name={
          selectedTrigger
            ? selectedTrigger.name
            : "Select the event that starts your zap"
        }
      />
      {selectedActions.map((action) => (
        <ZapCell
          onClick={() => setSelectedModalIndex(action.index)}
          key={Math.random()}
          boxType="Action"
          index={action.index}
          name={action.name ? action.name : "Select an action"}
        />
      ))}
      <AddCellBtn
        onClick={() => {
          setSelectedActions((a) => [
            ...a,
            {
              name: "",
              actionId: "",
              index: a.length + 2,
            },
          ]);
        }}
      />
      {selectedModalIndex && (
        <Modal
          index={selectedModalIndex}
          onSelect={handleModelSelect}
          availableItems={
            selectedModalIndex == 1 ? availableTriggers : availableActions
          }
        />
      )}
      {loading && <p>Loading Available actions</p>}
      {!loading && selectedModalIndex && (
        <Modal
          index={selectedModalIndex}
          onSelect={handleModelSelect}
          availableItems={
            selectedModalIndex == 1 ? availableTriggers : availableActions
          }
        />
      )}
    </div>
  );
};

export default page;

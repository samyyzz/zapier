"use client";

import { BoxBtn } from "@/components/buttons/BoxBtn";
import Modal, { SelectedModal } from "@/components/modal/Modal";
import AddCellBtn from "@/components/zap/AddCellBtn";
import ZapCell from "@/components/zap/ZapCell";
import { PRIMARY_BACKEDN_URL } from "@/config";
import { useAvailableActionsAndTriggers } from "@/hooks/useAvailableActionsAndTriggers";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface UserSelectedAction {
  name: string;
  actionId: string;
  index: number;
  metadata: any;
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
          metadata: props.metadata,
        };
        return newActions;
      });
      setSelectedModalIndex(null);
    }
  };

  const router = useRouter();

  const onPublish = async () => {
    const response = await axios.post(
      `${PRIMARY_BACKEDN_URL}/api/v1/zap`,
      {
        triggerId: selectedTrigger?.triggerId,
        metadata: {},
        actions: selectedActions.map((action) => ({
          actionID: action.actionId,
          metadata: action.metadata,
        })),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    router.push(`/dashboard`);
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
              metadata: {},
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
      {/* {loading && <p>Loading Available actions</p>} */}
      {!loading && selectedModalIndex && (
        <Modal
          index={selectedModalIndex}
          onSelect={handleModelSelect}
          availableItems={
            selectedModalIndex == 1 ? availableTriggers : availableActions
          }
        />
      )}
      <BoxBtn
        name={`Publish`}
        onClick={onPublish}
        className="text-sm text-white  w-80 md:w-96  bg-purple-600 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500"
      />
    </div>
  );
};

export default page;

"use client";

import { AvailableItem } from "@/components/modal/Modal";
import { PRIMARY_BACKEDN_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAvailableActionsAndTriggers = () => {
  const [availableActions, setAvailableActions] = useState<AvailableItem[]>([]);
  const [availableTriggers, setAvailableTriggers] = useState<AvailableItem[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  async function main() {
    try {
      setLoading(true);
      const resAction = await axios.get(
        `${PRIMARY_BACKEDN_URL}/api/v1/action/available`
      );
      const resp1 = await resAction.data.actions;

      const resTrigger = await axios.get(
        `${PRIMARY_BACKEDN_URL}/api/v1/trigger/available`
      );
      const resp2 = await resTrigger.data.triggers;
      setAvailableActions(resp1);
      setAvailableTriggers(resp2);
    } catch (error) {
      console.log("Failed to fetch actions/triggers data,", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    main();
  }, []);
  return { availableActions, availableTriggers, loading };
};

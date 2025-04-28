"use client";

import axios from "axios";
import { PRIMARY_BACKEDN_URL } from "@/config";
import { useEffect, useState } from "react";

const useZap = () => {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState();

  useEffect(() => {
    async function main() {
      const res = await axios.get(`${PRIMARY_BACKEDN_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setLoading(false);
      setZaps(res.data.zaps);
    }
    main();
  }, []);
  return {
    loading,
    zaps,
  };
};

export default useZap;

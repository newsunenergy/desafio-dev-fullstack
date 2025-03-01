"use client";
import { useEffect, useState } from "react";
import { api } from "../_config/api";
import { toast } from "../_utils/toast";

const useLeads = () => {
  const [data, setData] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const getLeads = () => {
    setIsLoading(true);
    api
      .get("/lead", {
        params: {
          search,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        toast({
          title: "Houve um erro...",
          text: err.data.message || "Recarregue a página",
          icon: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(getLeads, [search]);

  return {
    data: data,
    isLoading,
    setSearch,
    search,
  };
};

export default useLeads;

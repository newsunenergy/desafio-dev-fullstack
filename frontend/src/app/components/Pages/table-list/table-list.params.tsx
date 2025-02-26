/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { ITableListParams, ITableListProps } from "./table-list.interface";
import { TableListPageService } from "./table-list.service";
import { renderRowsList } from "./components/render-table";

export const HomeParams = (props: ITableListProps): ITableListParams => {
  const listService = new TableListPageService();

  const [data, setData] = useState<any>([]);
  const [orderAsc, setOrderAsc] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string | number | symbol>("createdAt");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const limit = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await listService.getClients(currentPage, limit, search, filter);

        if (res && Array.isArray(res.data)) {
          setData(res.data);
          setTotalPages(res.totalPages || 1);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [search, filter, currentPage]);



  const rows = renderRowsList(data);

  return {
    rows,
    open,
    loading,
    orderBy,
    orderAsc,
    setOrderBy,
    totalPages,
    currentPage,
    isModalOpen,
    setOrderAsc,
    setIsModalOpen,
    setCurrentPage,
    setOpen,
    search,
    setSearch,
    filter,
    setFilter
  };
};

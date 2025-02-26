import React from "react";
import { ITableListProps } from "./table-list.interface";
import { TableListView } from "./table-list.view";

export const TableListPage: React.FC<ITableListProps> = (props: ITableListProps) => {
  return <TableListView {...props}></TableListView>;
};

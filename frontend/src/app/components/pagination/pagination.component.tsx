import React from "react";
import { PaginationView } from "./pagination.view";
import { IPaginationComponentProps } from "./pagination.interface";

export const PaginationComponent: React.FC<IPaginationComponentProps> = (
  props: IPaginationComponentProps
) => {
  return <PaginationView {...props}></PaginationView>;
};

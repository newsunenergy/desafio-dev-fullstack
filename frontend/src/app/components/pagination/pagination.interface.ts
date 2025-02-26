import { HTMLAttributes } from "react";
export interface IPaginationProps {
  children?: React.ReactNode;
  currentPage: number;
  total: number;
  perPage: number;
  countPage: number;
  onChangeCurrentPage: (newCurrentPage: number) => void;
}

export type IPaginationComponentProps = IPaginationProps &
  HTMLAttributes<IPaginationProps>;

export type IPaginationParams = unknown

export interface IPaginationResponse<Type> {
  page: number;
  perPage: number;
  total: number;
  countPage: number;
  items: Type[];
  sort: string;
  sortBy: string;
  search: string;
}

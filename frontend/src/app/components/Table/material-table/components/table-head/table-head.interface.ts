import { HTMLAttributes } from "react";
import { HeadCell } from "../../material-table.interface";

export interface ITableHeadProps {
  children?: React.ReactNode;
  order: string | number | symbol;
  orderBy: string;
  rowCount: number;
  cells: HeadCell[];
  numSelected: number;
  addCollectionIcon?: boolean;
  activeToolBar?: boolean;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof string) => void;
}

export type ITableHeadComponentProps = ITableHeadProps &
  HTMLAttributes<ITableHeadProps>;

export type ITableHeadParams = unknown

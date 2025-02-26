import { HTMLAttributes } from "react";

export interface IToolbarProps {
  children?: React.ReactNode;
  removeIconAdd?: boolean | number;
  removeIconDelete?: boolean | number;
  addCollectionIcon?: boolean;
  numSelected: number;
  title: string;
  link?: string;
  onDeleteSelected: () => void;
  setIsModalOpen: (e: boolean) => void;
  selectedItem?: string;
}

export type IToolbarComponentProps = IToolbarProps &
  HTMLAttributes<IToolbarProps>;

export interface IToolbarParams {}

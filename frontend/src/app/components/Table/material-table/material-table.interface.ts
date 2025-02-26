import { HTMLAttributes } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Order = "asc" | "desc";

type T = unknown;
export interface IMaterialTableProps {
  rows?: T[];
  orderBy: string;
  cells?: HeadCell[];
  totalPages: number;
  currentPage: number;
  orderAsc: string | number | symbol;
  setOrderAsc: (field: Order) => void;
  setCurrentPage: (field: number) => void;
  setOrderBy: (orderBy: string | number | symbol) => void;

  link?: string;
  title?: string;
  totalItems?: number;
  excelQuery?: string;
  excelRoute?: string;
  isModalOpen?: boolean;
  excelFileName?: string;
  dateMaxAgenda?: boolean;
  updatePage?: () => void;
  readOnly?: boolean;
  loading?: boolean;
  pagination?: boolean;
  removeToolBar?: boolean;
  addCollectionIcon?: boolean;
  children?: React.ReactNode;
  remove?: (id: string) => void;
  ModalComponent?: React.ElementType | unknown;
  setIsModalOpen?: (e: boolean) => void;
  removeIconAdd?: boolean | number;
  removeIconDelete?: boolean | number;
  removeIconEdit?: boolean | number;
  tableCode?: string[];
}

export type IMaterialTableComponentProps = IMaterialTableProps &
  HTMLAttributes<IMaterialTableProps>;

export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  file?: string | StaticImport;
}

export interface IMaterialTableParams {
  loading: boolean;
  closeModal: () => void;
  selectedUpdate: string;
  selected: readonly string[];
  handleConfirmDelete: () => void;
  handleDeleteSelected: () => void;
  isConfirmationModalOpen: boolean;
  closeConfirmationModal: () => void;
  isSelected: (id: string) => boolean;
  handleUpdateSelected: (id: string) => void;
  handleDeleteIndividual: (id: string) => void;
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof unknown
  ) => void;
}

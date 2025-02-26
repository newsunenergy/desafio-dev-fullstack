/* eslint-disable @typescript-eslint/no-empty-object-type */
import { HTMLAttributes } from "react";

export type ISeverity = "success" | "error" | "warning" | "info";
export type IVariant = "filled" | "outlined" | "standard";

export interface IMaterialSnackbarProps {
  message: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: ISeverity;
  variant?: IVariant;
}

export type IMaterialSnackbarComponentProps = IMaterialSnackbarProps &
  HTMLAttributes<IMaterialSnackbarProps>;

export interface IMaterialSnackbarParams {}

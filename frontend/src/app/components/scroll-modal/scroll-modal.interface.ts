import { HTMLAttributes } from "react";

export interface IScrollModalProps {
  title: string;
  secondaryBtnTitle?: string;
  isOpen: boolean | undefined;
  fullScreen?: boolean;
  handleClose: () => void;
  buttons?: React.ReactNode;
  children?: React.ReactNode;
}

export type IScrollModalComponentProps = IScrollModalProps &
  HTMLAttributes<IScrollModalProps>;

export type IScrollModalParams = unknown

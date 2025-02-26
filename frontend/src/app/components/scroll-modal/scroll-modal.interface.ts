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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IScrollModalParams {}

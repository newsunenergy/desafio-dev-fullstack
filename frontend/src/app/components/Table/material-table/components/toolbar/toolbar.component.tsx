import React from "react";
import { IToolbarComponentProps } from "./toolbar.interface";
import { ToolbarView } from "./toolbar.view";

export const ToolbarComponent: React.FC<IToolbarComponentProps> = (
  props: IToolbarComponentProps
) => {
  return <ToolbarView {...props}></ToolbarView>;
};

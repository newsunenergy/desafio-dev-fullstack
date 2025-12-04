import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ScrollModalParams } from "./scroll-modal.params";
import {
  IScrollModalComponentProps,
  IScrollModalParams,
} from "./scroll-modal.interface";
import { Button } from "@mui/material";

export const ScrollModalView: React.FC<IScrollModalComponentProps> = (
  props: IScrollModalComponentProps
) => {
  const params: IScrollModalParams = ScrollModalParams(props);

  const descriptionElementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.isOpen]);

  return (
    <Dialog
      open={props.isOpen || false}
      onClose={props.handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
      fullWidth
      fullScreen={props.fullScreen ? props.fullScreen : false}
    >
      <DialogTitle
        id="scroll-dialog-title"
        className="text-xl font-semibold"

      >
        {props.title}
        <button
          onClick={props.handleClose}
          className="absolute top-2 right-2 p-1 hover:text-gray-950 focus:outline-none"

        >
          <MdClose size={24} />
        </button>
      </DialogTitle>
      <DialogContent className="p-2 md:p-4">
        <DialogContent className="p-2 md:p-4">
          <div id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {props.children}
          </div>
        </DialogContent>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button 

          onClick={props.handleClose}
        >
          {props.secondaryBtnTitle ? props.secondaryBtnTitle : "Cancelar"}
        </Button >
        {props.buttons}
      </DialogActions>
    </Dialog>
  );
};

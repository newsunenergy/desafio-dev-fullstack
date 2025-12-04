import React from "react";
import {
  IMaterialSnackbarComponentProps,
  IMaterialSnackbarParams,
} from "./material-snackbar.interface";
import { Alert } from "@mui/material";
import { CgClose } from "react-icons/cg";
import IconButton from "@mui/material/IconButton";
import { MaterialSnackbarParams } from "./material-snackbar.params";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

export const MaterialSnackbarView: React.FC<IMaterialSnackbarComponentProps> = (
  props: IMaterialSnackbarComponentProps
) => {
  const params: IMaterialSnackbarParams = MaterialSnackbarParams(props);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CgClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        variant={props.variant || "filled"}
        severity={props.severity}
      >
        {Array.isArray(props.message)
          ? props.message.map((msg, index) => <div key={index}>{msg}</div>)
          : props.message}
      </Alert>
    </Snackbar>

  );
};

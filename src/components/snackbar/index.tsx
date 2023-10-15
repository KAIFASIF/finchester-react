import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "./Alert";

type toastProps = {
  open: boolean;
  message: string;
  severity?: "success" | "error";
  handleClose?: any;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
};

const Toast: React.FC<toastProps> = ({
  open,
  message,
  severity,
  handleClose,
  vertical,
  horizontal,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical ? vertical : "top",
        horizontal: horizontal ? horizontal : "center",
      }}
      open={open ?? false}
      autoHideDuration={1000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity ?? "success"}
        className=""
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

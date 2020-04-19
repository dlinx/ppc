import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

interface Props {
  message: string;
  dialogStatus: boolean;
  onClose: () => void;
}

const InfoDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.dialogStatus}
      onClose={() => props.onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default InfoDialog;

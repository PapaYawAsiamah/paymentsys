import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const CustomDialogue = (props) => {
  const {
    handleClose,
    title,
    openDialog,
    confirmText,
    confirmAction,
    maxwidth,
    fullwidth,
    hideCloseBtn,
  } = props;

  const { members } = useContext(AppContext);
  return (
    <Dialog
      onClose={handleClose}
      open={openDialog}
      maxWidth={maxwidth}
      fullWidth={fullwidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        {!hideCloseBtn && (
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        )}
        <Button onClick={confirmAction ? confirmAction : handleClose}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
CustomDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  confirmAction: PropTypes.func,
  openDialog: PropTypes.bool.isRequired,

  title: PropTypes.string,
  hideCloseBtn: PropTypes.bool,
};

CustomDialog.defaultProps = {
  title: "Custom Dialog",
  confirmText: "Okay",
  maxwidth: "sm",
  fullwidth: false,
  hideCloseBtn: false,
};

export default CustomDialogue;

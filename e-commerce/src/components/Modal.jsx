import React, { useState } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal";

const OrderSuccessModal = () => {
  const { openModal } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw", // Adjust the maximum width to make it responsive
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center", // Center align content
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1">
            Your order has been successfully placed. Thank you for shopping with
            us!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OrderSuccessModal;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  styled,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/Cart";
import NoItemsInCart from "./NoItemsInYourCart";
import OrderSuccessModal from "./Modal";
import { modalActions } from "../store/modal";

const colorScheme = {
  primary: {
    main: "#3f51b5",
    contrastText: "#fff",
  },
  secondary: {
    main: "#f50057",
    contrastText: "#fff",
  },
  error: {
    main: "#f44336",
    contrastText: "#fff",
  },
};

const CustomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  margin: "1rem",
  padding: "1rem",
  flexWrap: "wrap",
  flexDirection: ["column", "row"],
  justifyContent: ["center", "space-around"],
  alignItems: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    transform: "scale(1.02)",
  },
  backgroundColor: "rgba(245, 245, 245, 0.9)",
}));

const CustomButton = styled(Button)(({ theme, color }) => ({
  margin: "4px",
  minWidth: "30px",
  borderRadius: "5px",
  backgroundColor: colorScheme[color].main,
  color: colorScheme[color].contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const NewCart = () => {
  const { cartItems } = useSelector((store) => store.cartItems);
  const { placeOrder } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const handleIncrement = (id) => {
    dispatch(cartActions.incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(cartActions.decrementQuantity(id));
  };
  const removeItems = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(cartActions.clearCart());
  };
  const handleOrder = () => {
    dispatch(modalActions.placeOrder());
      console.log(placeOrder);
  };


  const cartLength = cartItems.length === 0;

  const quantity = cartItems.map((item) => item.quantity);
  const price = cartItems.map((item) => item.price * item.quantity);

  let totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0);
  let totalMRP = price.reduce((acc, curr) => acc + curr, 0);
  const tax = 18;

  return (
    <Box m={4} p={4} sx={{ minHeight: "100vh", position: "relative" }}>
      {placeOrder ? (
        <OrderSuccessModal />
      ) : cartLength ? (
        <Box
          textAlign="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: " translate(-50%,-50%)",
          }}
        >
          <NoItemsInCart />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              textAlign={["center","start"]}
              fontWeight={900}
              fontSize="3rem"
              color="primary"
              letterSpacing="5px"
              sx={{ color: "#1976d2" }}
            >
              Your Cart
            </Typography>
            {cartItems.map((item) => (
              <CustomCard key={item.id}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, objectFit: "contain", marginRight: "1rem" }}
                  image={item.thumbnail}
                  alt={item.title}
                />
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <CustomButton
                      onClick={() => handleDecrement(item.id)}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      -
                    </CustomButton>
                    <Typography variant="body1" mx={1} color="text.primary">
                      {item.quantity}
                    </Typography>
                    <CustomButton
                      onClick={() => handleIncrement(item.id)}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      +
                    </CustomButton>
                    <CustomButton
                      onClick={() => removeItems(item.id)}
                      startIcon={<DeleteIcon />}
                      color="error"
                      size="small"
                    >
                      Remove
                    </CustomButton>
                  </Box>
                </CardContent>
              </CustomCard>
            ))}
            <Box mt={2}>
              <CustomButton
                onClick={handleClear}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Clear Cart
              </CustomButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="white"
              p={2}
              borderRadius={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            >
              <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
                Payment Summary
              </Typography>
              <Typography variant="body1" mb={2} color="text.secondary">
                Total Items: {totalQuantity}
              </Typography>
              <Typography variant="body1" mb={2} color="text.secondary">
                Price: $ {totalMRP}
              </Typography>
              <Typography variant="body1" mb={2} color="text.secondary">
                Tax (18%): $ {((tax / 100) * totalMRP).toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                letterSpacing={2}
              >
                Total Amount: $ {Math.round(totalMRP * (1 + tax / 100))}
              </Typography>
              <Box mt={2}>
                <CustomButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleOrder}
                >
                  Place Order
                </CustomButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NewCart;

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Rating,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/Items";
import { fetchActions } from "../store/fetch";
import { cartActions } from "../store/Cart";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledContainer = styled(Box)({
  padding: "2rem",
  minHeight: "100vh",
});

const Card = styled(MuiCard)({
  display: "flex",
  borderRadius: "10px",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: " blur( 4px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

const CardMedia = styled(MuiCardMedia)({
  width: "100%",
  height: "300px",
  objectFit: "contain",
  objectPosition: "center",
  borderRadius: "10px 0 0 10px",
});

const DeleteButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#f44336",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const Product = () => {
  const { productId, product } = useSelector((store) => store.items);
  const { cartItems } = useSelector((store) => store.cartItems);
  const removeItem = () => {
    dispatch(cartActions.removeFromCart(product.id));
  };
  const addItem = () => {
    dispatch(cartActions.addToCart(product));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(itemActions.setProduct(data));
      });
  }, [productId, dispatch]);
  const cartItemIds = cartItems.map((item) => item.id);
  const itemsInCart = cartItemIds.includes(productId);

  return (
    <StyledContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: "fit-content" }}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              title={product.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textTransform: "capitalize",
              fontWeight: "600",
              letterSpacing: "6px",
            }}
          >
            {product.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: $ {product.price}
          </Typography>
          <Typography variant="body2" color="primary" gutterBottom>
            Discount: {product.discountPercentage}%
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            display="flex"
            alignItems="center"
            gap={1}
          >
            Rating:
            <Rating value={Math.round(product.rating)} name="read-only" />{" "}
            {Math.round(product.rating)}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Stock: {product.stock}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Brand: {product.brand}
          </Typography>
          <Typography
            textTransform={"capitalize"}
            variant="body2"
            color="textSecondary"
            gutterBottom
          >
            Category: {product.category}
          </Typography>
          {itemsInCart ? (
            <DeleteButton fullWidth onClick={removeItem} startIcon={<DeleteIcon />}>
              Remove From Cart
            </DeleteButton>
          ) : (
            <Button fullWidth variant="contained" onClick={addItem}>Add to Cart </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            More Images:
            <Grid container spacing={2} pt={2}>
              {product.images &&
                product.images.map((image, index) => (
                  <Grid item xs={6} sm={2} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={image}
                        title={`Image ${index + 1}`}
                      />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Product;

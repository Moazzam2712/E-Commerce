import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  Typography,
  Card,
  Button,
  Alert,
  Stack,
  styled,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { cartActions } from "../store/Cart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { itemActions } from "../store/Items";
import { Link } from "react-router-dom";
const DeleteButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#f44336",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const CardComponent = ({ product }) => {
  const {
    title,
    price,
    thumbnail,
    discountPercentage,
    brand,
    id,
    rating,
    category,
  } = product;
  const { cartItems } = useSelector((store) => store.cartItems);
  const { productId } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  const cartItemIds = cartItems.map((item) => item.id);
  const itemsInCart = cartItemIds.includes(id);

  const handleItem = () => {
    dispatch(
      cartActions.addToCart({
        price,
        title,
        thumbnail,
        discountPercentage,
        brand,
        id,
      })
    );
  };

  const removeItem = () => {
    dispatch(cartActions.removeFromCart(id));
  };
  const handleViewMore = (id) => {
    dispatch(itemActions.viewProduct(id));
  };

  return (
    <Card
      sx={{
        pb: "15px",
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "3px solid #ccc",
        transition: "all 0.4s",
        borderRadius: "20px",
          "&:hover": {
          transform: "scale(1.05)",

          boxShadow: ` rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
        },
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardHeader
        title={title}
        subheader={brand}
        sx={{ fontSize: "10px", textTransform: "capitalize" }}
      />
      <CardMedia
        component="img"
        height="100px"
        image={thumbnail}
        alt={title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{display:"flex",flexDirection:"column",gap:"1rem"}}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Rating value={rating} name="read-only" />{" "}
        </Typography>

        <Typography variant="p" >
          Discount :{" "}
          <Typography variant="p"  >
            {discountPercentage} %
          </Typography>
        </Typography>

        <Typography variant="p">
          Price :{" "}
          <Typography variant="span" fontWeight={600} color="red">
            $ {price}
          </Typography>
        </Typography>

        <Typography variant="p" >
          Category :{" "}
          <Typography variant="span" fontWeight={600} color="darkblue ">
            {category.toUpperCase()}
          </Typography>
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          component={Link}
          to={`/product/${productId}`}
          onClick={() => handleViewMore(id)}
        >
          View More
        </Button>
        {itemsInCart ? (
          <DeleteButton startIcon={<DeleteIcon />} onClick={removeItem}>
            Remove
          </DeleteButton>
        ) : (
          <Button
            startIcon={<AddShoppingCartIcon />}
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
            onClick={handleItem}
          >
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CardComponent;

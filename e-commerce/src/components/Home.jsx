import { ThemeProvider, keyframes } from "@emotion/react";
import { Alert, Box, Stack, Typography, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "./Card";
import { cartActions } from "../store/Cart";
import Product from "./Product";
import CustomCarousel from "./Carausel";
import Example from "./Carausel";
import Carausel from "./Carausel";

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});
const Home = () => {
  const { items, category, home, searchTerm, productId } = useSelector(
    (store) => store.items
  );
  const { addAlert } = useSelector((store) => store.cartItems);
  const dispatch = useDispatch();

  const filteredItems =
    searchTerm !== ""
      ? items.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : category
      ? items.filter((item) => item.category === category)
      : items;
  const error = searchTerm && filteredItems.length === 0;
  setTimeout(() => {
    dispatch(cartActions.hideAlert());
  }, 2000);

  return (
    <>
      <Carausel items={items.slice(0, 5)} />
      <Box p={5} mx={5}>
        <Typography color={"#001F3F"}
          variant="h2"
          sx={{letterSpacing:"-1px", animation: `${fadeIn} 1s ease-in` }}
          fontWeight={700}
        >
          Our All Products
        </Typography>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          position: "relative",
          py: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {addAlert && (
          <Box
            sx={{
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <Alert variant="filled" severity="success">
              Added To Cart
            </Alert>
          </Box>
        )}

        {home ? (
          items.map((product) => (
            <CardComponent key={product.title} product={product} />
          ))
        ) : error ? (
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {" "}
            Sorry :'( <br />
            No matching items found
          </Typography>
        ) : (
          filteredItems.map((product) => (
            <CardComponent key={product.title} product={product} />
          ))
        )}
      </Box>
    </>
  );
};

export default Home;

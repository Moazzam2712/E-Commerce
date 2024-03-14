import React from "react";
import {
  Typography,
  Container,
  Paper,
  Grid,
  Fade,
  CardMedia,
  Box,
} from "@mui/material";
import image from "../assets/cart.png";
const NoItemsInCart = () => {
  return (
    <Fade in={true} timeout={1000}>
      <Container maxWidth="md" style={{ marginTop: "50px", display: "flex" }}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            width: "100%",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: ["column", "row"],
              }}
            >
              <Grid item>
                <Box
                  component="img"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: 233,
                    width: 250,
                  }}
                  src={image}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  letterSpacing="2px"
                  gutterBottom
                  align="center"
                >
                  No items in your Cart
                </Typography>
                <Typography variant="body1" align="center">
                  Your shopping cart is empty. Start adding items now!
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Fade>
  );
};

export default NoItemsInCart;

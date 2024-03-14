import { Container, Typography, Paper, Box } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ my: "5rem" }}>
      <Paper
        sx={{ padding: "20px", marginTop: "20px", backgroundColor: "#f5f5f5" }}
      >
        <Typography
          variant="h4"
          letterSpacing={4}
          fontWeight={900}
          sx={{ marginBottom: "20px", color: "#1976d2", textAlign: "center" }}
        >
          About ShoppersCart
        </Typography>

        <Box p={5} letterSpacing={2}>
          <Typography variant="p" paragraph sx={{ marginBottom: "20px" }}>
            Welcome to ShoppersCart, your ultimate destination for online
            shopping. We are dedicated to providing you with the best shopping
            experience possible.
          </Typography>
          <Typography variant="p" paragraph sx={{ marginBottom: "20px" }}>
            Our mission is to offer a wide range of high-quality products at
            competitive prices, along with exceptional customer service. Whether
            you're looking for electronics, fashion, home goods, or anything in
            between, ShoppersCart has you covered.
          </Typography>
          <Typography variant="p" paragraph sx={{ marginBottom: "20px" }}>
            At ShoppersCart, we believe in making online shopping convenient,
            secure, and enjoyable for our customers. We strive to exceed your
            expectations with every purchase you make.
          </Typography>
          <Typography variant="p" paragraph>
            Thank you for choosing ShoppersCart for all your shopping needs. We
            look forward to serving you and providing you with a delightful
            shopping experience.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;

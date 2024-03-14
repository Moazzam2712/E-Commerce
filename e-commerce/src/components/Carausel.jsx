import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Container,
  CardMedia,
  Typography,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import itemActions from "../store/Items";
import { Box } from "@mui/system";

const Carausel = ({ items }) => {
 

  return (
    <Carousel>
      {items.map((item, index) => (
        <Paper
          key={item}
          sx={{
            padding: "5rem",
            display: "flex",
            textAlign:"center",
            flexDirection: [
              "column-reverse",
              "column-reverse",
              "column-reverse",
              "row",
            ],
            justifyContent: "center",
            alignItems: "center",

            flexWrap: "wrap",
            gap: ["2rem", "6rem"],
            background: "hsla(202, 57%, 75%, 1)",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            flexDirection="column"
            gap={8}
          >
            <Typography
              variant="h3"
              fontWeight={900}
              color="white"
              fontSize={["3rem", "5rem"]}
              display="flex"
              flexWrap="wrap"
              sx={{ textShadow: "4px 4px #070707" }}
            >
              {item.title}
            </Typography>
            {/* <Button
            component={Link}
              variant="contained"
      to="#home"
              sx={{
                color: "#001F3F",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white",scale:"1.1" },
              }}
            >
                Check it out !
            </Button> */}
          </Box>
          <Card
            sx={{
              maxWidth: 400,
              maxHeight: 400,
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <CardMedia
              component="img"
              sx={{ objectFit: "cover", objectPosition: "center" }}
              image={item.thumbnail}
              alt={item.title}
            />
          </Card>
        </Paper>
      ))}
    </Carousel>
  );
};

export default Carausel;

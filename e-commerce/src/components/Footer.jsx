import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {Link as LinkTag} from 'react-router-dom'

const CustomLink = styled(LinkTag)({
  padding:"0.7rem",
  color:"white",
  textDecoration:"none",
  '&:hover':{
    backgroundColor:"white",
    borderRadius:"10px",
    color:"black",
  }
});

const Footer = () => {
  return (
    <Box color="white" bgcolor="#0183c1 " p={4}>
      <Container>
        <Stack
          direction="column"
          alignItems="center"
          gap={2}
          justifyContent="center"
        >
      

          <Typography variant="p" letterSpacing={2} textAlign={"center"}>
            Registered Address: ShoppersCart Headquarters 1234 Market Street
            Anytown, USA
          </Typography>
          <Typography variant="p" letterSpacing={2}>
            ©️ ShoppersCart. All Rights Reserved
          </Typography>

          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"3rem"}
          >
            <CustomLink to="/about" underline="none" color={"inherit"}>
              About Us
            </CustomLink>
            <CustomLink  underline="none" color={"inherit"}>
              Privacy & Policy
            </CustomLink>
            <CustomLink
              to="mailto:moazzamkazi1227@gmail.com"
              underline="none"
              color={"inherit"}
            >
              Contact Us
            </CustomLink>
            <CustomLink to={"/signIn"} underline="none">
              Login
            </CustomLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as LinkTag, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function SignUp() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      const response = await fetch(`http://localhost:3000/user?email=${email}`);
      const existingUser = await response.json();

      if (existingUser.length > 0) {
        toast.error(
          "Email already exists. Please use a different email address."
        );
        return;
      }
    } catch (error) {
      toast.error("Error checking email availability.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Registered Successfully");
        navigate("/signIn");
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } catch (error) {
      toast.error("Failed: " + error.message);
    }

    reset();
  };

  return (

<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    First Name is required ***
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    Last Name is required ***
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    Email is required ***
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  name="contact"
                  type="tel"
                  {...register("contact", { required: true })}
                />
                {errors.contact && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    Contact is required ***
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    Password is required ***
                  </Typography>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    Password should be minimum 8 characters ***
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={LinkTag} to={"/signIn"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box my={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="text.secondary" component={LinkTag} to={"/"}>
              www.ShoppersCart.com
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
  );
}

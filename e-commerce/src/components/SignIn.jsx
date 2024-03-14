import * as React from "react";
import { useState } from "react";
import axios from "axios"; // Add this line to import axios
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Link as LinkTag, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";


async function loginUser(credentials) {
  return fetch("http://localhost:3000/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function SignIn({ setToken }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:3001/signIn", {
        email,
        password,
      });
      navigate("/home");
      toast.success("Signed In Successfully");
      setToken(response.data.token);
      reset();
      login();
    } catch (error) {
      setError("Invalid email or password");
    }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Typography variant="body1" sx={{ color: "red" }}>
                Email is required ***
              </Typography>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
            {error && (
              <Typography variant="body1" color="red">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container my={4}>
              <Grid item>
                <Link component={LinkTag} to={"/signUp"} variant="body2">
                  Don't have an Account ? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default SignIn;

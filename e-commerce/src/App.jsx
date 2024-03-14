import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import About from "./components/About"; 
import FetchItems from "./components/FetchItems";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import Product from "./components/Product";
import NewCart from "./components/NewCart";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/AuthContext";
import useToken from "./hooks/useToken";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const { token, setToken } = useToken();
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
      <Router>
        <AuthProvider>
          <Header mode={mode} setMode={setMode} />
          <ToastContainer />
          <FetchItems />
          <Routes>
            <Route
              path="/"
              element={fetchStatus.currentlyFetching ? <Loader /> : <Home />}
            />
            <Route exact path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<NewCart />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/signIn"
              element={!token && <SignIn setToken={setToken} />}
            />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
  );
}

export default App;

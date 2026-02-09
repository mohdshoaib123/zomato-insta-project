import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import Createfood from "../pages/food-partner/Createfood";
import Profile from "../pages/food-partner/Profile";
import CreateAccount from "../pages/general/CreateAccount";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/user/login" element={<UserLogin></UserLogin>} />
        <Route path="/user/register" element={<UserRegister></UserRegister>} />
        <Route
          path="/foodpartner/login"
          element={<FoodPartnerLogin></FoodPartnerLogin>}
        />

        <Route
          path="/foodpartner/register"
          element={<FoodPartnerRegister></FoodPartnerRegister>}
        />
        
        <Route
          path="/"
          element={<CreateAccount></CreateAccount>}
        />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/saved" element={<Saved></Saved>} />
        <Route path="/create-food" element={<Createfood></Createfood>} />
        <Route path="/food-partner/:id" element={<Profile></Profile>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

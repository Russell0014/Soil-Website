// import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

import Home from "./pages/Home";
import DietPlanner from "./pages/DietPlanner";
import GardenHelper from "./pages/GardenHelper";
import Specials from "./pages/Specials";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile";
import UserProfile from "./components/Profile/UserProfile";
import DietProfile from "./components/Profile/DietProfile";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./components/AuthContext";
import { UserCartProvider } from "./components/CartContext";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <UserCartProvider>
        {location.pathname !== "/checkout" &&
          location.pathname !== "/checkout/thankyou" && <Header />}

        <Notification />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diet-planner" element={<DietPlanner />} />
          <Route path="/garden-helper" element={<GardenHelper />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/thankyou" element={<ThankYou />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserProfile />} />
            <Route path="diet-plan" element={<DietProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </UserCartProvider>
    </AuthProvider>
  );
}

export default App;

// Import necessary dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Import components
import AdminLogin from "./admin/adminpanel/AdminLogin";
import Dashboard from "./admin/adminpanel/Dashboard";
import Home from "./userInterface/screens/Home";
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "./userInterface/components/Header";
import FinalProduct from "./userInterface/screens/FinalProduct";
import Footer from "./userInterface/components/Footer";
import Cart from "./userInterface/screens/Cart";
import ProductSearchScreen from "./userInterface/screens/ProductSearchScreen";
import Checkout from "./userInterface/screens/checkout";
import PaymentComponent from "./userInterface/screens/Payment";
import Wistlist from "./userInterface/screens/Wistlist";
import MyOrders from "./userInterface/screens/MyOrder";
import MyProfile from "./userInterface/screens/MyProfile";
import BrandProduct from "./userInterface/screens/BrandProduct";

function App() {
  // Media query hook for responsive design
  const matches = useMediaQuery('(max-width:780px)');
  const location = useLocation()
  const isDashboard = location.pathname.toLowerCase().includes("/dashboard")
  const isAdmin = location.pathname.includes("/Admin")
  

  return (
    // Main Router wrapper
    <div>
      {/* Root container with flex layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Quicksand',
          height: "100vh",
          width: '100%',
          boxSizing: "border-box",
        }}>
        {/* minHeight: '64px' */}
        {/* Header container */}
        
         {!isAdmin && <Header />}
       

        {/* Main content container with responsive margin */}
        <div style={{ flexGrow: 1, marginTop: isDashboard ? 0 : matches ? "120px" : "70px", backgroundColor: "#191919", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          {/* Route definitions */}
          <Routes>
            <Route element={<AdminLogin />} path="/AdminLogin" />
            <Route element={<Dashboard />} path="/dashboard/*" />
            <Route element={<Home />} path="/" />
            <Route element={<FinalProduct />} path="/product/:productdetailid/:productid" />
            <Route element={<ProductSearchScreen />} path="/productsearch/:search" />
            <Route element={<BrandProduct />} path="/brand/:brandid" />
            <Route element={<Wistlist />} path="/wishlist" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Checkout />} path="/checkout/:productdetailid?" />
            <Route element={<PaymentComponent />} path="/payment" />
            <Route element={<MyOrders />} path="/orders" />
            <Route element={<MyProfile />} path="/myprofile" />


          </Routes>
        </div>

        {/* Footer component */}
        {!isAdmin && <Footer />}
      </div>
    </div>
  );
}

export default App;

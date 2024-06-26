import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./adminComponent/Login/Login.jsx";
import { Signup } from "./adminComponent/Signup/Signup.jsx";
import Home from "./adminComponent/Home/Home.jsx";
import Seller from "./sellerComponent/Seller/Seller.jsx";
import ViewProduct from "./sellerComponent/ViewProduct/ViewProduct.jsx";
import ViewCart from "./sellerComponent/ViewCart/ViewCart.jsx";
import HomeBuyer from "./buyerComponent/Home/HomeBuyer.jsx";
import AddToCart from "./buyerComponent/AddToCart/AddToCart.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/App/Store.js";
import BuyerMain from "./adminComponent/Buyer/BuyerMain.jsx";
import OrderMain from "./adminComponent/Order/OrderMain.jsx";
import SellerMain from "./adminComponent/Seller/SellerMain.jsx";
import SellerDetail from "./adminComponent/Seller/SellerDetails.jsx";
import SellerProductDetail from "./adminComponent/Seller/SellerProductDetail.jsx";
import BuyerDetail from "./adminComponent/Buyer/BuyerDetail.jsx";

import ProductsMain from "./adminComponent/Products/ProductsMain.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="productMain" element={<ProductsMain />} />
          <Route path="buyerMain" element={<BuyerMain />} />
          <Route path="buyerDetail/:id" element={<BuyerDetail />} />
          <Route path="sellerMain" element={<SellerMain />} />
          <Route path="sellerDetail/:id" element={<SellerDetail />} />
          <Route
            path="sellerProductDetail/:id"
            element={<SellerProductDetail />}
          />

          <Route path="orderMain" element={<OrderMain />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* admin */}

        {/* //seller */}
        <Route path="seller" element={<Seller />} />
        <Route path="view-product" element={<ViewProduct />} />
        <Route path="view-cart" element={<ViewCart />} />

        {/* //buyer */}
        <Route path="buyer" element={<HomeBuyer />} />
        <Route path="cart" element={<AddToCart />} />
      </Routes>
    </Router>
  </Provider>
);

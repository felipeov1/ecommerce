import React from "react";

import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;

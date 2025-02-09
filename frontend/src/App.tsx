import React from "react";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext";

const App: React.FC = () => (
  <CartProvider>
    <AppRoutes />
  </CartProvider>
);

export default App;

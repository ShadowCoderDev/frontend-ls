import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      isLoggedIn ? (
                        <Navigate to="/products" replace />
                      ) : (
                        <Navigate to="/auth" replace />
                      )
                    }
                  />
                  <Route
                    path="/auth"
                    element={
                      isLoggedIn ? (
                        <Navigate to="/products" replace />
                      ) : (
                        <Auth onLogin={handleLogin} />
                      )
                    }
                  />
                  <Route
                    path="/products"
                    element={isLoggedIn ? <Products /> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/product/:id"
                    element={isLoggedIn ? <ProductDetail /> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/checkout"
                    element={isLoggedIn ? <Checkout /> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/orders"
                    element={isLoggedIn ? <Orders /> : <Navigate to="/auth" replace />}
                  />
                  <Route
                    path="/profile"
                    element={isLoggedIn ? <Profile /> : <Navigate to="/auth" replace />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

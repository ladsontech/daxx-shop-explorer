import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import PropertyDetail from "./pages/PropertyDetail";
import GadgetsPage from "./pages/GadgetsPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import FashionPage from "./pages/FashionPage";
import PropertyPage from "./pages/PropertyPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gadgets" element={<GadgetsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/fashion" element={<FashionPage />} />
              <Route path="/property" element={<PropertyPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
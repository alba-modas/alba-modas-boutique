import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import { CartProvider } from "@/hooks/useCart";
import Layout from "@/components/Layout";
import CartDrawer from "@/components/CartDrawer";
import WelcomePopup from "@/components/WelcomePopup";
import HomePage from "@/pages/HomePage";
import ProdutosPage from "@/pages/ProdutosPage";
import CarrinhoPage from "@/pages/CarrinhoPage";
import QuemSomosPage from "@/pages/QuemSomosPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AdminPage from "@/pages/AdminPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <CartProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/produtos" element={<ProdutosPage />} />
                  <Route path="/carrinho" element={<CarrinhoPage />} />
                  <Route path="/quem-somos" element={<QuemSomosPage />} />
                  <Route path="/produto/:slug" element={<ProductDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
              <CartDrawer />
              <WelcomePopup />
            </CartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

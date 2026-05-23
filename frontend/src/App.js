import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminLeads from "./pages/AdminLeads";
import { Toaster } from "./components/ui/sonner";
import GlassCursor from "./components/GlassCursor";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog/:slug" element={<CategoryPage />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/leads" element={<AdminLeads />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster position="top-center" richColors />
      <GlassCursor />
    </div>
  );
}

export default App;

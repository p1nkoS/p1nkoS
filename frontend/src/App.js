import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import { Toaster } from "./components/ui/sonner";
import GlassCursor from "./components/GlassCursor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
      <GlassCursor />
    </div>
  );
}

export default App;

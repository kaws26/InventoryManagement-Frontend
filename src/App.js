import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AdminRoute, ProtectedRoute } from './service/Gaurd';
import CategoryPage from "./pages/CategoryPage";
import SupplierPage from "./pages/SupplierPage";
import AddEditSupplierPage from "./pages/AddEditSupplierPage";
import ProductPage from "./pages/ProductPage";
import AddEditProductPage from "./pages/AddEditProductPage";
import PurchasePage from "./pages/PurchasePage";
import SellPage from "./pages/SellPage";
import TransactionsPage from "./pages/TransactionPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/add-supplier" element={<AddEditSupplierPage />} />
          <Route path="/edit-supplier/:supplierId" element={<AddEditSupplierPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/add-product" element={<AddEditProductPage />} />
          <Route path="/edit-product/:productId" element={<AddEditProductPage />} />
        </Route>

        {/* PROTECTED ROUTES (ADMIN + MANAGER) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/transaction" element={<TransactionsPage />} />
          <Route path="/transaction/:transactionId" element={<TransactionDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

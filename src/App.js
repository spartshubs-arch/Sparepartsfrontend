

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Register from './pages/Register';
import VendorLogin from './pages/VendorLogin';
import UserLayout from './pages/user/UserLayout';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminSliderManager from './pages/admin/AdminFeaturedProducts';
import AdminHomeTopBanner from './pages/admin/AdminHomeTopBanner';
import AdminViewProducts from './pages/admin/AdminViewProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminRegister from "./pages/admin/AdminRegister";
import AdminCategory from './pages/admin/AdminAddCarDetails';
import AdminViewCarDetails from './pages/admin/AdminViewCarDetails';
import AdminFooterPage from './pages/admin/AdminFooterPage';

import VendorLayout from './pages/VendorLayout';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ViewProducts from './pages/ViewProducts';
import EditProduct from './pages/EditProduct';

import Home from './pages/user/Homepage';
import Contact from './pages/user/Contact';
import Blog from './pages/user/Blog';
import About from './pages/user/About';
import ShopPage from './pages/user/ShopPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import CartPage from './pages/user/CartPage';
import Signup from './pages/user/Signup';
import PrivateRoute from './pages/user/PrivateRoute';
import LoginUser from './pages/user/LoginUser';
import AllUsersPage from './pages/admin/AllUsersPage';
import OrdersPage from './pages/user/OrderPage';
import AdminOrdersPage from './pages/admin/AdminOrderPage';
import AdminCallbackRequests from './pages/admin/AdminCallbackRequests';
import AdminBlogManager from './pages/admin/AdminAddBlog';
import HelpCenter from './pages/user/HelpCenter';
import ContactAdmin from './pages/admin/ContactAdmin';
import AdminMessages from './pages/admin/AdminMessages';
import AdminAboutUs from './pages/admin/AdminAboutUs';
import Faq from './pages/user/Faq';
import Faqadmin from './pages/admin/FAQAdmin';
import AdminHelpCenter from './pages/admin/AdminHelpCenter';
import WhatsAppButton from "./components/Whatsappstick";
import Profile from './pages/user/ProfilePage';
import VendorProfile from './pages/Profile';
import AdminVendorProfile from './pages/admin/AdminVendorProfile';
import SuperAdminLogin from './pages/superAdmin/superAdminLogin';
import SuperAdminDashboard from './pages/superAdmin/superAdminDashboard';
import SuperAdminApproval from './pages/superAdmin/superAdminApproval'; 

// ── ADD THIS IMPORT ───────────────────────────────────────────────────────────
import AdminProtectedRoute from './components/AdminProtectedRoute';
// ─────────────────────────────────────────────────────────────────────────────

const stripePromise = loadStripe('pk_test_51Qbg2tK29pl9G0SlXl3izpV6j0wW3jkWpSeSWahlVJwcXcWZAkiHDcR9jCFSz5ySu9BlXmHAOSu2YLQ0PrSGgLY700TjNPAztV');

function App() {
  return (
    <Router>
      <WhatsAppButton />
      <Elements stripe={stripePromise}>
        <Routes>

          {/* ── Public Routes ───────────────────────────────────────────────── */}
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/register"       element={<Register />} />
          <Route path="/loginuser"      element={<LoginUser />} />
          <Route path="/signup"         element={<Signup />} />
          <Route path="/admin/login"    element={<AdminLogin />} />
          <Route path="/vendor/login"   element={<VendorLogin />} />

          {/* ── Super Admin ─────────────────────────────────────────────────── */}
          <Route path="/superadmin/login"          element={<SuperAdminLogin />} />
          <Route path="/superadmin/dashboard"      element={<SuperAdminDashboard />} />
          <Route path="/superadmin/admin-approval" element={<SuperAdminApproval />} />

          {/* ── User Layout ─────────────────────────────────────────────────── */}
          <Route path="/" element={<UserLayout />}>
            <Route index          element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about"   element={<About />} />
            <Route path="shop"    element={<ShopPage />} />
            <Route path="order"   element={<OrdersPage />} />
            <Route path="blog"    element={<Blog />} />
            <Route path="helpcenter" element={<HelpCenter />} />
            <Route path="faq"     element={<Faq />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="cart" element={<Elements stripe={stripePromise}><CartPage /></Elements>} />
            </Route>
          </Route>

          {/* ── Admin Protected Routes ──────────────────────────────────────── */}
          <Route path="/admin/*" element={<AdminLayout />}>

            <Route
              path="dashboard"
              element={
                <AdminProtectedRoute pageKey="dashboard">
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="vendors"
              element={
                <AdminProtectedRoute pageKey="vendors">
                  <AdminVendors />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="vendors/:id"
              element={
                <AdminProtectedRoute pageKey="vendors">
                  <AdminVendorProfile />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="sliders"
              element={
                <AdminProtectedRoute pageKey="sliders">
                  <AdminSliderManager />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="category-banners"
              element={
                <AdminProtectedRoute pageKey="category-banners">
                  <AdminHomeTopBanner />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="view-products"
              element={
                <AdminProtectedRoute pageKey="view-products">
                  <AdminViewProducts />
                </AdminProtectedRoute>
              }
            />

            {/* edit-product is a sub-action of products — use same key */}
            <Route
              path="edit-product/:id"
              element={
                <AdminProtectedRoute pageKey="view-products">
                  <AdminEditProduct />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="add-category"
              element={
                <AdminProtectedRoute pageKey="add-category">
                  <AdminCategory />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="view-car-details"
              element={
                <AdminProtectedRoute pageKey="view-car-details">
                  <AdminViewCarDetails />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="users"
              element={
                <AdminProtectedRoute pageKey="users">
                  <AllUsersPage />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="orders"
              element={
                <AdminProtectedRoute pageKey="orders">
                  <AdminOrdersPage />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="callbackrequest"
              element={
                <AdminProtectedRoute pageKey="callbackrequest">
                  <AdminCallbackRequests />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="blogpage"
              element={
                <AdminProtectedRoute pageKey="blogpage">
                  <AdminBlogManager />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="contact"
              element={
                <AdminProtectedRoute pageKey="contact">
                  <ContactAdmin />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="messages"
              element={
                <AdminProtectedRoute pageKey="messages">
                  <AdminMessages />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="about-us"
              element={
                <AdminProtectedRoute pageKey="about-us">
                  <AdminAboutUs />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="faq"
              element={
                <AdminProtectedRoute pageKey="faq">
                  <Faqadmin />
                </AdminProtectedRoute>
              }
            />

            {/* footer and helpcenter are not in NAV_ITEMS so no permission needed */}
            <Route path="footer"     element={<AdminFooterPage />} />
            <Route path="helpcenter" element={<AdminHelpCenter />} />

          </Route>

          {/* ── Vendor Routes ───────────────────────────────────────────────── */}
          <Route path="/vendor/*" element={<VendorLayout />}>
            <Route index               element={<Dashboard />} />
            <Route path="add-product"  element={<AddProduct />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="edit/:id"     element={<EditProduct />} />
            <Route path="profile"      element={<VendorProfile />} />
          </Route>

          {/* ── Fallback ────────────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Elements>
      <ToastContainer position="top-center" autoClose={3000} />
      <WhatsAppButton />
    </Router>
  );
}

export default App;

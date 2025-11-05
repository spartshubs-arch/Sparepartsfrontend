
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
import Blog from './pages/user/Blog'
import About from './pages/user/About'
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

const stripePromise = loadStripe('pk_test_51Qbg2tK29pl9G0SlXl3izpV6j0wW3jkWpSeSWahlVJwcXcWZAkiHDcR9jCFSz5ySu9BlXmHAOSu2YLQ0PrSGgLY700TjNPAztV');

function App() {
  return (
    <Router>
            <WhatsAppButton />

      <Elements stripe={stripePromise}>
    <Routes>

  {/* Public Routes */}
  <Route path="/admin/register" element={<AdminRegister />} />
  <Route path="/register" element={<Register />} />
  <Route path="/loginuser" element={<LoginUser/>} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/vendor/login" element={<VendorLogin />} /> 

  {/* User Layout */}
  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="contact" element={<Contact />} />
    <Route path="about" element={<About />} />
    <Route path="shop" element={<ShopPage />} />
   <Route path="order" element={<OrdersPage/>} />
    <Route path="blog" element={<Blog/>} />
    <Route path="helpcenter" element={<HelpCenter/>} />
        <Route path="faq" element={<Faq/>} />
        <Route path="profile" element={<Profile/>} />
    


    <Route path="product/:id" element={<ProductDetailPage />} />

    {/* 🔒 Protected Route: Cart */}
    {/* <Route element={<PrivateRoute />}>
      <Route path="cart" element={<CartPage />} />
    </Route>
  </Route> */}
<Route element={<PrivateRoute />}>
  <Route
    path="cart"
    element={
      <Elements stripe={stripePromise}>
        <CartPage />
      </Elements>
    }
  />
</Route>
</Route>
        {/* 🔐 Admin Protected Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="sliders" element={<AdminSliderManager />} />
          <Route path="category-banners" element={<AdminHomeTopBanner />} />
          <Route path="view-products" element={<AdminViewProducts />} />
          <Route path="edit-product/:id" element={<AdminEditProduct />} />
          <Route path="add-category" element={<AdminCategory />} />
          <Route path="view-car-details" element={<AdminViewCarDetails />} />
          <Route path="users" element={<AllUsersPage />} />
           <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="callbackrequest" element={<AdminCallbackRequests />} />
          <Route path="blogpage" element={<AdminBlogManager/>} />
          <Route path="contact" element={<ContactAdmin/>} />
          <Route path="messages" element={<AdminMessages/>} />
         <Route path="about-us" element={<AdminAboutUs/>} />
          <Route path="faq" element={<Faqadmin />} />
          <Route path="footer" element={<AdminFooterPage />} />
          <Route path="helpcenter" element={<AdminHelpCenter/>} />
<Route path="vendors/:id" element={<AdminVendorProfile />} />


        </Route>

        {/* ✅ Vendor Routes (use distinct path to avoid conflict) */}
        <Route path="/vendor/*" element={<VendorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="profile" element={<VendorProfile/>} />
        </Route>

        {/* 🌐 Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      </Elements>
            <ToastContainer position="top-center" autoClose={3000} />
      <WhatsAppButton />

    </Router>
  );
}

export default App;

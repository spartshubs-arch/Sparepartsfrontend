// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from "react-toastify"; 
// import Register from './pages/Register';
// import VendorLogin from './pages/VendorLogin';
// import UserLayout from './pages/user/UserLayout';

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminVendors from "./pages/admin/AdminVendors";
// import AdminSliderManager from './pages/admin/AdminFeaturedProducts';
// import AdminHomeTopBanner from './pages/admin/AdminHomeTopBanner';
// import AdminViewProducts from './pages/admin/AdminViewProduct';   
// import AdminEditProduct from './pages/admin/AdminEditProduct';
// import AdminRegister from "./pages/admin/AdminRegister";
// import AdminCategory from './pages/admin/AdminAddCarDetails';
// import AdminViewCarDetails from './pages/admin/AdminViewCarDetails';
// import AdminFooterPage from './pages/admin/AdminFooterPage';

// import VendorLayout from './pages/VendorLayout';
// import Dashboard from './pages/Dashboard';
// import AddProduct from './pages/AddProduct';
// import ViewProducts from './pages/ViewProducts';
// import EditProduct from './pages/EditProduct';

// import Home from './pages/user/Homepage';
// import Contact from './pages/user/Contact';
// import Blog from './pages/user/Blog';
// import BlogDetailPage from './pages/user/BlogDetailPage';
// import About from './pages/user/About';
// import ShopPage from './pages/user/ShopPage';
// import ProductDetailPage from './pages/user/ProductDetailPage';
// import CartPage from './pages/user/CartPage';
// import Signup from './pages/user/Signup';
// import PrivateRoute from './pages/user/PrivateRoute';
// import LoginUser from './pages/user/LoginUser';
// import AllUsersPage from './pages/admin/AllUsersPage';
// import OrdersPage from './pages/user/OrderPage';
// import AdminOrdersPage from './pages/admin/AdminOrderPage';
// import AdminCallbackRequests from './pages/admin/AdminCallbackRequests';
// import AdminBlogManager from './pages/admin/AdminAddBlog';
// import HelpCenter from './pages/user/HelpCenter';
// import ContactAdmin from './pages/admin/ContactAdmin';
// import AdminMessages from './pages/admin/AdminMessages';
// import AdminAboutUs from './pages/admin/AdminAboutUs';
// import Faq from './pages/user/Faq';
// import Faqadmin from './pages/admin/FAQAdmin';
// import AdminHelpCenter from './pages/admin/AdminHelpCenter';
// import WhatsAppButton from "./components/Whatsappstick";
// import Profile from './pages/user/ProfilePage';
// import VendorProfile from './pages/Profile';
// import AdminVendorProfile from './pages/admin/AdminVendorProfile';
// import SuperAdminLogin from './pages/superAdmin/superAdminLogin';
// import SuperAdminDashboard from './pages/superAdmin/superAdminDashboard';
// import SuperAdminApproval from './pages/superAdmin/superAdminApproval'; 

// // ── ADD THIS IMPORT ───────────────────────────────────────────────────────────
// import AdminProtectedRoute from './components/AdminProtectedRoute';
// // ─────────────────────────────────────────────────────────────────────────────

// const stripePromise = loadStripe('pk_test_51Qbg2tK29pl9G0SlXl3izpV6j0wW3jkWpSeSWahlVJwcXcWZAkiHDcR9jCFSz5ySu9BlXmHAOSu2YLQ0PrSGgLY700TjNPAztV');

// function App() {
//   return (
//     <Router>
//       <WhatsAppButton />
//       <Elements stripe={stripePromise}>
//         <Routes>

//           {/* ── Public Routes ───────────────────────────────────────────────── */}
//           <Route path="/admin/register" element={<AdminRegister />} />
//           <Route path="/register"       element={<Register />} />
//           <Route path="/loginuser"      element={<LoginUser />} />
//           <Route path="/signup"         element={<Signup />} />
//           <Route path="/admin/login"    element={<AdminLogin />} />
//           <Route path="/vendor/login"   element={<VendorLogin />} />

//           {/* ── Super Admin ─────────────────────────────────────────────────── */}
//           <Route path="/superadmin/login"          element={<SuperAdminLogin />} />
//           <Route path="/superadmin/dashboard"      element={<SuperAdminDashboard />} />
//           <Route path="/superadmin/admin-approval" element={<SuperAdminApproval />} />

//           {/* ── User Layout ─────────────────────────────────────────────────── */}
//           <Route path="/" element={<UserLayout />}>
//             <Route index          element={<Home />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="about"   element={<About />} />
//             <Route path="shop"    element={<ShopPage />} />
//             <Route path="order"   element={<OrdersPage />} />
//             <Route path="blog"    element={<Blog />} />
//             <Route path="blog/:id" element={<BlogDetailPage />} />
//             <Route path="helpcenter" element={<HelpCenter />} />
//             <Route path="faq"     element={<Faq />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="product/:id" element={<ProductDetailPage />} />
//             <Route element={<PrivateRoute />}>
//               <Route path="cart" element={<Elements stripe={stripePromise}><CartPage /></Elements>} />
//             </Route>
//           </Route>

//           {/* ── Admin Protected Routes ──────────────────────────────────────── */}
//           <Route path="/admin/*" element={<AdminLayout />}>

//             <Route
//               path="dashboard"
//               element={
//                 <AdminProtectedRoute pageKey="dashboard">
//                   <AdminDashboard />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="vendors"
//               element={
//                 <AdminProtectedRoute pageKey="vendors">
//                   <AdminVendors />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="vendors/:id"
//               element={
//                 <AdminProtectedRoute pageKey="vendors">
//                   <AdminVendorProfile />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="sliders"
//               element={
//                 <AdminProtectedRoute pageKey="sliders">
//                   <AdminSliderManager />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="category-banners"
//               element={
//                 <AdminProtectedRoute pageKey="category-banners">
//                   <AdminHomeTopBanner />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="view-products"
//               element={
//                 <AdminProtectedRoute pageKey="view-products">
//                   <AdminViewProducts />
//                 </AdminProtectedRoute>
//               }
//             />

//             {/* edit-product is a sub-action of products — use same key */}
//             <Route
//               path="edit-product/:id"
//               element={
//                 <AdminProtectedRoute pageKey="view-products">
//                   <AdminEditProduct />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="add-category"
//               element={
//                 <AdminProtectedRoute pageKey="add-category">
//                   <AdminCategory />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="view-car-details"
//               element={
//                 <AdminProtectedRoute pageKey="view-car-details">
//                   <AdminViewCarDetails />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="users"
//               element={
//                 <AdminProtectedRoute pageKey="users">
//                   <AllUsersPage />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="orders"
//               element={
//                 <AdminProtectedRoute pageKey="orders">
//                   <AdminOrdersPage />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="callbackrequest"
//               element={
//                 <AdminProtectedRoute pageKey="callbackrequest">
//                   <AdminCallbackRequests />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="blogpage"
//               element={
//                 <AdminProtectedRoute pageKey="blogpage">
//                   <AdminBlogManager />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="contact"
//               element={
//                 <AdminProtectedRoute pageKey="contact">
//                   <ContactAdmin />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="messages"
//               element={
//                 <AdminProtectedRoute pageKey="messages">
//                   <AdminMessages />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="about-us"
//               element={
//                 <AdminProtectedRoute pageKey="about-us">
//                   <AdminAboutUs />
//                 </AdminProtectedRoute>
//               }
//             />

//             <Route
//               path="faq"
//               element={
//                 <AdminProtectedRoute pageKey="faq">
//                   <Faqadmin />
//                 </AdminProtectedRoute>
//               }
//             />

//             {/* footer and helpcenter are not in NAV_ITEMS so no permission needed */}
//             <Route path="footer"     element={<AdminFooterPage />} />
//             <Route path="helpcenter" element={<AdminHelpCenter />} />

//           </Route>

//           {/* ── Vendor Routes ───────────────────────────────────────────────── */}
//           <Route path="/vendor/*" element={<VendorLayout />}>
//             <Route index               element={<Dashboard />} />
//             <Route path="add-product"  element={<AddProduct />} />
//             <Route path="view-products" element={<ViewProducts />} />
//             <Route path="edit/:id"     element={<EditProduct />} />
//             <Route path="profile"      element={<VendorProfile />} />
//           </Route>

//           {/* ── Fallback ────────────────────────────────────────────────────── */}
//           <Route path="*" element={<Navigate to="/" />} />

//         </Routes>
//       </Elements>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <WhatsAppButton />
//     </Router>
//   );
// }

// export default App;










import React from "react";

function App() {
  return (
    <div className="warning-page">
      <div className="warning-container">

        {/* Warning Triangle */}
        <div className="warning-icon">
          <div className="triangle">
            <span>!</span>
          </div>
        </div>

        {/* Main heading */}
        <h1>The site ahead contains harmful programs</h1>

        {/* Description */}
        <p className="description">
          Attackers on{" "}
          <span className="redacted">localhost</span>{" "}
          might attempt to trick you into installing programs that harm
          your browsing experience (for example, by changing your homepage
          or showing extra ads on sites you visit).{" "}
          <a href="#learn">Learn more</a>
        </p>

        {/* Checkbox */}
        <div className="checkbox-row">
          <div className="fake-checkbox"></div>

          <span>
            Help improve Safe Browsing by sending some system information and
            page content to Google.
          </span>
        </div>

        <div className="privacy">
          <a href="#privacy">Privacy policy</a>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button className="details-button">
            Details
          </button>

          <button
            className="back-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to safety
          </button>
        </div>

      </div>

      {/* Demo label - remove before screenshot if desired */}
      <div className="demo-label">
        CYBERSECURITY TRAINING DEMO — LOCALHOST
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          width: 100%;
          height: 100%;
          font-family: Arial, Helvetica, sans-serif;
        }

        body {
          background: #df2d23;
        }

        .warning-page {
          min-height: 100vh;
          width: 100%;
          background: #df2d23;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .warning-container {
          width: 520px;
          margin-left: calc(50% - 260px);
          padding-top: 98px;
        }

        /* Triangle */

        .warning-icon {
          width: 56px;
          height: 55px;
          margin-bottom: 32px;
          position: relative;
        }

        .triangle {
          width: 0;
          height: 0;
          border-left: 28px solid transparent;
          border-right: 28px solid transparent;
          border-bottom: 49px solid #ffffff;
          position: relative;
        }

        .triangle span {
          position: absolute;
          left: -4px;
          top: 17px;
          color: #df2d23;
          font-size: 26px;
          font-weight: bold;
          line-height: 1;
        }

        /* Heading */

        h1 {
          font-size: 21px;
          font-weight: 400;
          margin: 0 0 17px 0;
          line-height: 1.35;
        }

        /* Description */

        .description {
          font-size: 14px;
          line-height: 23px;
          margin: 0;
          width: 510px;
        }

        .description a,
        .privacy a {
          color: white;
          text-decoration: underline;
          cursor: pointer;
        }

        /* Simulated redacted hostname */

        .redacted {
          display: inline-block;
          width: 82px;
          height: 15px;
          background: rgba(255,255,255,0.92);
          vertical-align: middle;
          margin: 0 2px;
          color: transparent;
          border-radius: 1px;
        }

        /* Checkbox */

        .checkbox-row {
          display: flex;
          align-items: flex-start;
          margin-top: 32px;
          font-size: 13px;
          line-height: 19px;
          width: 510px;
        }

        .fake-checkbox {
          width: 14px;
          height: 14px;
          border: 1px solid white;
          border-radius: 2px;
          margin-right: 7px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .privacy {
          margin-left: 21px;
          margin-top: 4px;
          font-size: 13px;
        }

        /* Buttons */

        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 43px;
          width: 503px;
        }

        button {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          cursor: pointer;
        }

        .details-button {
          color: white;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 4px;
          padding: 8px 13px;
        }

        .details-button:hover {
          background: rgba(255,255,255,0.08);
        }

        .back-button {
          color: #5f6368;
          background: white;
          border: none;
          border-radius: 4px;
          padding: 9px 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }

        .back-button:hover {
          background: #f5f5f5;
        }

        /* Training indicator */

        .demo-label {
          position: fixed;
          bottom: 12px;
          right: 16px;
          font-size: 10px;
          letter-spacing: 0.7px;
          color: rgba(255,255,255,0.45);
        }

        @media (max-width: 700px) {
          .warning-container {
            width: calc(100% - 50px);
            margin-left: 25px;
            padding-top: 70px;
          }

          .description,
          .checkbox-row,
          .buttons {
            width: 100%;
          }

          .buttons {
            max-width: 503px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;

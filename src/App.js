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
import BlogDetailPage from './pages/user/BlogDetailPage';
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
            <Route path="blog/:id" element={<BlogDetailPage />} />
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











// import React, { useState } from "react";

// export default function App() {
//   const [screen, setScreen] = useState("warning");
//   const [checked, setChecked] = useState(false);
//   const [privacyOpen, setPrivacyOpen] = useState(false);

//   // =========================
//   // SAFE HOME SCREEN
//   // =========================
//   if (screen === "safe") {
//     return (
//       <div style={styles.safePage}>
//         <div style={styles.safeCard}>
//           <div style={styles.safeIcon}>✓</div>

//           <h1 style={{ marginBottom: 10 }}>
//             You're back to safety
//           </h1>

//           <p style={styles.grayText}>
//             The simulated security warning has been closed.
//           </p>

//           <button
//             style={styles.blueButton}
//             onClick={() => setScreen("warning")}
//           >
//             Return to Security Warning
//           </button>

//           <button
//             style={styles.redOutlineButton}
//             onClick={() => setScreen("incident")}
//           >
//             Open Security Incident 
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // DETAILS SCREEN
//   // =========================
//   if (screen === "details") {
//     return (
//       <div style={styles.detailsPage}>
//         <div style={styles.detailsCard}>

//           <div style={styles.darkHeader}>
//             <div>Security Diagnostic Information</div>

//             <button
//               onClick={() => setScreen("warning")}
//               style={styles.closeButton}
//             >
//               ×
//             </button>
//           </div>

//           <div style={styles.detailsBody}>

//             <div style={styles.warningSmall}>
//               !
//             </div>

//             <h2>
//               Simulated Security Detection
//             </h2>

//             <p style={styles.grayText}>
//               No malware is installed and no
//               information is transmitted to Google.
//             </p>

//             <div style={styles.separator} />

//             <div style={styles.infoGrid}>

//               <div>
//                 <strong>Environment</strong>
//                 <span>localhost</span>
//               </div>

//               <div>
//                 <strong>Detection</strong>
//                 <span>Suspicious Web Behavior</span>
//               </div>

//               <div>
//                 <strong>Risk Level</strong>
//                 <span style={styles.highRisk}>
//                   HIGH — SIMULATED
//                 </span>
//               </div>

//               <div>
//                 <strong>Incident ID</strong>
//                 <span>DEMO-SEC-001</span>
//               </div>

//               <div>
//                 <strong>Status</strong>
//                 <span>Navigation Blocked</span>
//               </div>

//               <div>
//                 <strong>Source</strong>
//                 <span>Ip Attack</span>
//               </div>

//             </div>

//             <h3 style={{ marginTop: 30 }}>
//               Security Event Log
//             </h3>

//             <div style={styles.logBox}>
//               <div>[16:28:41] Request received</div>
//               <div>[16:28:42] Page behavior analyzed</div>
//               <div>[16:28:42] Suspicious resource detected</div>
//               <div>[16:28:43] Navigation blocked</div>
//               <div>[16:28:43] Warning displayed</div>
//             </div>

//             <h3 style={{ marginTop: 30 }}>
//               Recommended Investigation
//             </h3>

//             <ul style={styles.list}>
//               <li>Review application and server logs.</li>
//               <li>Inspect unexpected external resources.</li>
//               <li>Check recently modified files.</li>
//               <li>Audit third-party dependencies.</li>
//               <li>Review authentication activity.</li>
//               <li>Check Content Security Policy violations.</li>
//               <li>Investigate unexpected redirects.</li>
//             </ul>

//             <button
//               style={styles.blueButton}
//               onClick={() => setScreen("warning")}
//             >
//               Back to Warning
//             </button>

//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // LEARN MORE SCREEN
//   // =========================
//   if (screen === "learn") {
//     return (
//       <div style={styles.detailsPage}>
//         <div style={styles.detailsCard}>

//           <div style={styles.darkHeader}>
//             <div>About this Security Warning</div>

//             <button
//               onClick={() => setScreen("warning")}
//               style={styles.closeButton}
//             >
//               ×
//             </button>
//           </div>

//           <div style={styles.detailsBody}>

//             <h2>
//               Why was this page blocked?
//             </h2>

//             <p style={styles.grayText}>
//               In a real browser security system, a warning like this
//               can appear when a website has been identified as
//               potentially dangerous or compromised.
//             </p>

//             <div style={styles.explanationBox}>
//               <strong>Possible causes include:</strong>

//               <ul style={styles.list}>
//                 <li>Malicious JavaScript injection</li>
//                 <li>Unauthorized redirects</li>
//                 <li>Compromised third-party scripts</li>
//                 <li>Phishing content</li>
//                 <li>Malicious downloads</li>
//                 <li>Compromised website resources</li>
//               </ul>
//             </div>

//             <h3>
//               Security Response
//             </h3>

//             <ol style={styles.list}>
//               <li>Identify the affected resource.</li>
//               <li>Contain the affected application.</li>
//               <li>Review logs and recent changes.</li>
//               <li>Remove unauthorized content.</li>
//               <li>Patch the underlying vulnerability.</li>
//               <li>Re-scan and verify the application.</li>
//             </ol>

//             <button
//               style={styles.blueButton}
//               onClick={() => setScreen("warning")}
//             >
//               Back to Warning
//             </button>

//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // PRIVACY MODAL
//   // =========================
//   if (screen === "warning" && privacyOpen) {
//     return (
//       <div style={styles.warningPage}>

//         <div style={styles.warningContainer}>

//    <div style={styles.warningTriangle}>
//   <div style={styles.warningExclamation}>!</div>
// </div>

//           <h1 style={styles.title}>
//             The site ahead contains harmful programs
//           </h1>

//           <p style={styles.description}>
//             Attackers on <span style={styles.redacted}></span>{" "}
//             might attempt to trick you into installing programs
//             that harm your browsing experience.
//           </p>

//           <div style={styles.modalOverlay}>
//             <div style={styles.modal}>

//               <div style={styles.modalHeader}>
//                 Privacy Policy

//                 <button
//                   onClick={() => setPrivacyOpen(false)}
//                   style={styles.modalClose}
//                 >
//                   ×
//                 </button>
//               </div>

//               <div style={styles.modalBody}>
//                 <h3>Attact Thread-0011010110101001111</h3>

//                 <p>
//                   No system information or page content is sent
//                   anywhere.
//                 </p>

//                 <p>
//                   The warning and diagnostic information are
//                   simulated .
//                 </p>

//                 <button
//                   style={styles.blueButton}
//                   onClick={() => setPrivacyOpen(false)}
//                 >
//                   Close
//                 </button>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // INCIDENT SCREEN
//   // =========================
//   if (screen === "incident") {
//     return (
//       <div style={styles.incidentPage}>

//         <div style={styles.incidentCard}>

//           <div style={styles.incidentHeader}>
//             SECURITY INCIDENT 
//           </div>

//           <div style={styles.incidentBody}>

//             <div style={styles.incidentIcon}>
//               !
//             </div>

//             <h1 style={{ color: "#b3261e" }}>
//               Simulated Security Incident
//             </h1>

//             <p style={styles.grayText}>
//               The user continued past the simulated security
//               warning. The application has entered controlled
//               incident-analysis mode.
//             </p>

//             <div style={styles.incidentGrid}>

//               <div>
//                 <strong>Incident ID</strong>
//                 <span>SEC-001</span>
//               </div>

//               <div>
//                 <strong>Environment</strong>
//                 <span>attack</span>
//               </div>

//               <div>
//                 <strong>Risk</strong>
//                 <span style={{ color: "#b3261e" }}>
//                   HIGH — SIMULATED
//                 </span>
//               </div>

//               <div>
//                 <strong>Status</strong>
//                 <span>CONTAINED</span>
//               </div>

//             </div>

//             <h3>
//               Detected Indicators
//             </h3>

//             <ul style={styles.list}>
//               <li>Unexpected external resource</li>
//               <li>Suspicious redirect behavior</li>
//               <li>Unauthorized DOM modification attempt</li>
//               <li>Unknown third-party resource</li>
//             </ul>

//             <h3>
//               Incident Response Workflow
//             </h3>

//             <div style={styles.workflow}>

//               <div>01<br /><strong>DETECT</strong></div>
//               <div>02<br /><strong>CONTAIN</strong></div>
//               <div>03<br /><strong>INVESTIGATE</strong></div>
//               <div>04<br /><strong>REMOVE</strong></div>
//               <div>05<br /><strong>PATCH</strong></div>
//               <div>06<br /><strong>VERIFY</strong></div>

//             </div>

//             <div style={styles.buttonRow}>

//               <button
//                 style={styles.blueButton}
//                 onClick={() => setScreen("warning")}
//               >
//                 Return to Warning
//               </button>

//               <button
//                 style={styles.grayButton}
//                 onClick={() => setScreen("safe")}
//               >
//                 Return to Safe Environment
//               </button>

//             </div>

//           </div>
//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // MAIN WARNING SCREEN
//   // =========================
//   return (
//     <div style={styles.warningPage}>

//       <div style={styles.warningContainer}>

//         {/* WARNING ICON */}

//         <div style={styles.triangle}>
//           <span>!</span>
//         </div>

//         {/* TITLE */}

//         <h1 style={styles.title}>
//           The site ahead contains harmful programs
//         </h1>

//         {/* DESCRIPTION */}

//         <p style={styles.description}>
//           Attackers on{" "}
//           <span style={styles.redacted}>
//             localhost
//           </span>{" "}
//           might attempt to trick you into installing programs
//           that harm your browsing experience (for example, by
//           changing your homepage or showing extra ads on sites
//           you visit).{" "}

//           <button
//             onClick={() => setScreen("learn")}
//             style={styles.textLink}
//           >
//             Learn more
//           </button>
//         </p>

//         {/* CHECKBOX */}

//         <div style={styles.checkboxRow}>

//           <input
//             type="checkbox"
//             checked={checked}
//             onChange={(e) => setChecked(e.target.checked)}
//             style={styles.checkbox}
//           />

//           <span>
//             Help improve Safe Browsing by sending some system
//             information and page content to Google.
//           </span>

//         </div>

//         {/* PRIVACY */}

//         <button
//           onClick={() => setPrivacyOpen(true)}
//           style={styles.textLink}
//         >
//           Privacy policy
//         </button>

//         {/* BUTTONS */}

//         <div style={styles.buttons}>

//           <button
//             onClick={() => setScreen("details")}
//             style={styles.detailsButton}
//           >
//             Details
//           </button>

//           <button
//             onClick={() => setScreen("safe")}
//             style={styles.backButton}
//           >
//             Back to safety
//           </button>

//         </div>

//         {/* TRAINING CONTROL */}

//         <div style={styles.trainingArea}>

//           <div style={styles.trainingText}>
//             CONTROLLED CYBERSECURITY TRAINING
//           </div>

//           <button
//             onClick={() => setScreen("incident")}
//             style={styles.unsafeButton}
//           >
//             Simulate unsafe continuation
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }


// // ======================================================
// // STYLES
// // ======================================================

// const styles = {

//   warningPage: {
//     minHeight: "100vh",
//     background: "#df2d23",
//     color: "white",
//     fontFamily: "Arial, Helvetica, sans-serif",
//     overflow: "auto",
//   },

//   warningContainer: {
//     width: "520px",
//     maxWidth: "calc(100% - 40px)",
//     margin: "0 auto",
//     paddingTop: "98px",
//   },

// warningTriangle: {
//   position: "relative",
//   width: "56px",
//   height: "49px",
//   marginBottom: "32px",
// },

// warningTriangle: {
//   position: "relative",
//   width: "0",
//   height: "0",
//   borderLeft: "28px solid transparent",
//   borderRight: "28px solid transparent",
//   borderBottom: "49px solid white",
//   marginBottom: "32px",
// },

// warningExclamation: {
//   position: "absolute",
//   left: "-5px",
//   top: "16px",
//   color: "#df2d23",
//   fontSize: "25px",
//   fontWeight: "bold",
//   lineHeight: "1",
//   zIndex: 10,
// },

//   title: {
//     fontSize: "21px",
//     fontWeight: 400,
//     lineHeight: 1.35,
//     margin: "0 0 17px",
//   },

//   description: {
//     fontSize: "14px",
//     lineHeight: "23px",
//     margin: 0,
//   },

//   redacted: {
//     display: "inline-block",
//     width: "82px",
//     height: "15px",
//     background: "white",
//     color: "transparent",
//     verticalAlign: "middle",
//     margin: "0 2px",
//   },

//   textLink: {
//     background: "none",
//     border: "none",
//     color: "white",
//     textDecoration: "underline",
//     cursor: "pointer",
//     padding: 0,
//     fontSize: "inherit",
//     fontFamily: "inherit",
//   },

//   checkboxRow: {
//     display: "flex",
//     alignItems: "flex-start",
//     marginTop: "32px",
//     fontSize: "13px",
//     lineHeight: "19px",
//   },

//   checkbox: {
//     width: "14px",
//     height: "14px",
//     margin: "1px 7px 0 0",
//     cursor: "pointer",
//     flexShrink: 0,
//   },

//   buttons: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "43px",
//     width: "503px",
//     maxWidth: "100%",
//   },

//   detailsButton: {
//     color: "white",
//     background: "transparent",
//     border: "1px solid white",
//     borderRadius: "4px",
//     padding: "8px 13px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },

//   backButton: {
//     color: "#5f6368",
//     background: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "9px 16px",
//     cursor: "pointer",
//     fontSize: "13px",
//     boxShadow: "0 1px 2px rgba(0,0,0,.15)",
//   },

//   trainingArea: {
//     marginTop: "60px",
//     paddingTop: "18px",
//     borderTop: "1px solid rgba(255,255,255,.25)",
//   },

//   trainingText: {
//     fontSize: "10px",
//     letterSpacing: "1px",
//     opacity: .55,
//     marginBottom: "10px",
//   },

//   unsafeButton: {
//     background: "transparent",
//     border: "1px solid rgba(255,255,255,.55)",
//     color: "white",
//     borderRadius: "4px",
//     padding: "8px 12px",
//     cursor: "pointer",
//     fontSize: "11px",
//   },

//   // DETAILS

//   detailsPage: {
//     minHeight: "100vh",
//     background: "#f1f3f4",
//     fontFamily: "Arial, Helvetica, sans-serif",
//     padding: "50px 20px",
//   },

//   detailsCard: {
//     maxWidth: "780px",
//     margin: "0 auto",
//     background: "white",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 2px 14px rgba(0,0,0,.15)",
//   },

//   darkHeader: {
//     background: "#202124",
//     color: "white",
//     padding: "18px 22px",
//     fontSize: "16px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   closeButton: {
//     background: "none",
//     border: "none",
//     color: "white",
//     fontSize: "25px",
//     cursor: "pointer",
//   },

//   detailsBody: {
//     padding: "30px",
//   },

//   warningSmall: {
//     width: "34px",
//     height: "34px",
//     borderRadius: "50%",
//     background: "#fce8e6",
//     color: "#d93025",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: "bold",
//     fontSize: "20px",
//   },

//   grayText: {
//     color: "#5f6368",
//     lineHeight: 1.6,
//   },

//   separator: {
//     height: "1px",
//     background: "#e5e7eb",
//     margin: "25px 0",
//   },

//   infoGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "0",
//     border: "1px solid #e5e7eb",
//     borderRadius: "6px",
//     overflow: "hidden",
//   },

//   highRisk: {
//     color: "#b3261e",
//     fontWeight: "bold",
//   },

//   logBox: {
//     background: "#202124",
//     color: "#e8eaed",
//     padding: "17px",
//     borderRadius: "6px",
//     fontFamily: "monospace",
//     fontSize: "13px",
//     lineHeight: 2,
//   },

//   list: {
//     lineHeight: 1.9,
//   },

//   blueButton: {
//     marginTop: "20px",
//     background: "#1a73e8",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "10px 18px",
//     cursor: "pointer",
//     fontSize: "14px",
//   },

//   grayButton: {
//     marginTop: "20px",
//     background: "#f1f3f4",
//     color: "#202124",
//     border: "1px solid #dadce0",
//     borderRadius: "4px",
//     padding: "10px 18px",
//     cursor: "pointer",
//     fontSize: "14px",
//   },

//   explanationBox: {
//     background: "#f8f9fa",
//     border: "1px solid #dadce0",
//     borderRadius: "6px",
//     padding: "18px",
//     marginTop: "20px",
//   },

//   // PRIVACY

//   modalOverlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,.45)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 100,
//   },

//   modal: {
//     width: "480px",
//     maxWidth: "calc(100% - 40px)",
//     background: "white",
//     color: "#202124",
//     borderRadius: "8px",
//     boxShadow: "0 5px 30px rgba(0,0,0,.35)",
//     overflow: "hidden",
//   },

//   modalHeader: {
//     background: "#202124",
//     color: "white",
//     padding: "17px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   modalClose: {
//     background: "none",
//     border: "none",
//     color: "white",
//     fontSize: "24px",
//     cursor: "pointer",
//   },

//   modalBody: {
//     padding: "25px",
//     lineHeight: 1.6,
//   },

//   // INCIDENT

//   incidentPage: {
//     minHeight: "100vh",
//     background: "#f5f5f5",
//     fontFamily: "Arial, Helvetica, sans-serif",
//     padding: "50px 20px",
//   },

//   incidentCard: {
//     maxWidth: "850px",
//     margin: "0 auto",
//     background: "white",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 2px 15px rgba(0,0,0,.15)",
//   },

//   incidentHeader: {
//     background: "#202124",
//     color: "white",
//     padding: "18px 22px",
//     fontSize: "13px",
//     letterSpacing: ".5px",
//   },

//   incidentBody: {
//     padding: "30px",
//   },

//   incidentIcon: {
//     width: "48px",
//     height: "48px",
//     borderRadius: "50%",
//     background: "#fce8e6",
//     color: "#b3261e",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "26px",
//     fontWeight: "bold",
//   },

//   incidentGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     border: "1px solid #ddd",
//     borderRadius: "6px",
//     margin: "25px 0",
//     overflow: "hidden",
//   },

//   workflow: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "10px",
//     marginTop: "15px",
//   },

//   buttonRow: {
//     display: "flex",
//     gap: "12px",
//     flexWrap: "wrap",
//   },

//   safePage: {
//     minHeight: "100vh",
//     background: "#f8f9fa",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "Arial, Helvetica, sans-serif",
//   },

//   safeCard: {
//     background: "white",
//     padding: "40px",
//     width: "500px",
//     maxWidth: "calc(100% - 40px)",
//     textAlign: "center",
//     borderRadius: "10px",
//     boxShadow: "0 2px 15px rgba(0,0,0,.12)",
//   },

//   safeIcon: {
//     margin: "0 auto 20px",
//     width: "55px",
//     height: "55px",
//     borderRadius: "50%",
//     background: "#e6f4ea",
//     color: "#188038",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "30px",
//   },

//   redOutlineButton: {
//     display: "block",
//     margin: "15px auto 0",
//     background: "transparent",
//     border: "1px solid #d93025",
//     color: "#d93025",
//     borderRadius: "4px",
//     padding: "10px 18px",
//     cursor: "pointer",
//   },
// };



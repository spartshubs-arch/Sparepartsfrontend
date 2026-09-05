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








import React, { useState } from "react";

export default function App() {
  const [details, setDetails] = useState(false);
  const [consent, setConsent] = useState(false);
  const [unsafe, setUnsafe] = useState(false);
  const [incident, setIncident] = useState(false);

  // -------------------------------
  // SAFE LANDING PAGE
  // -------------------------------
  if (!incident) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9fa",
          fontFamily: "Arial, Helvetica, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            width: 520,
            padding: 40,
            borderRadius: 10,
            boxShadow: "0 2px 15px rgba(0,0,0,.12)",
            textAlign: "center",
          }}
        >
          <h2>Security Demonstration Environment</h2>

          <p style={{ color: "#666", lineHeight: 1.6 }}>
            This is a controlled localhost cybersecurity training
            environment.
          </p>

          <button
            onClick={() => setIncident(true)}
            style={{
              marginTop: 20,
              padding: "12px 22px",
              border: 0,
              borderRadius: 5,
              background: "#d93025",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Simulate Security Warning
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------
  // UNSAFE SIMULATION
  // -------------------------------
  if (unsafe) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fff",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: 50,
        }}
      >
        <div
          style={{
            maxWidth: 850,
            margin: "0 auto",
            border: "1px solid #dadce0",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#202124",
              color: "white",
              padding: 18,
              fontSize: 15,
            }}
          >
            Security Training Environment
          </div>

          <div style={{ padding: 35 }}>
            <h2 style={{ color: "#b3261e" }}>
              ⚠ Simulated Security Incident
            </h2>

            <p>
              The user selected the simulated unsafe continuation option.
            </p>

            <div
              style={{
                background: "#fce8e6",
                border: "1px solid #f5c2c0",
                padding: 20,
                borderRadius: 6,
                marginTop: 20,
              }}
            >
              <strong>Incident ID:</strong> DEMO-SEC-001
              <br />
              <strong>Environment:</strong> localhost
              <br />
              <strong>Detection:</strong> Suspicious page behavior
              <br />
              <strong>Status:</strong> Contained
            </div>

            <h3 style={{ marginTop: 30 }}>Simulated Indicators</h3>

            <ul style={{ lineHeight: 2 }}>
              <li>Unexpected external script request</li>
              <li>Suspicious redirect behavior</li>
              <li>Unauthorized DOM modification attempt</li>
              <li>Unknown third-party resource</li>
            </ul>

            <h3>Recommended Response</h3>

            <ol style={{ lineHeight: 2 }}>
              <li>Isolate the affected application.</li>
              <li>Review application and server logs.</li>
              <li>Identify unauthorized changes.</li>
              <li>Remove malicious/injected resources.</li>
              <li>Rotate compromised credentials if applicable.</li>
              <li>Patch the vulnerable component.</li>
              <li>Re-scan the application.</li>
            </ol>

            <button
              onClick={() => setIncident(false)}
              style={{
                marginTop: 20,
                padding: "11px 20px",
                background: "#1a73e8",
                color: "white",
                border: 0,
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Return to Safe Environment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------
  // DETAILS PANEL
  // -------------------------------
  if (details) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9fa",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            background: "white",
            borderRadius: 8,
            boxShadow: "0 2px 12px rgba(0,0,0,.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#202124",
              color: "white",
              padding: 20,
              fontSize: 17,
            }}
          >
            Security Diagnostic Information
          </div>

          <div style={{ padding: 30 }}>
            <h2>Simulated Threat Analysis</h2>

            <p style={{ color: "#5f6368" }}>
              The following information is generated exclusively for this
              cybersecurity demonstration.
            </p>

            <hr />

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 20,
              }}
            >
              <tbody>
                <tr>
                  <td style={cellLabel}>Environment</td>
                  <td style={cellValue}>localhost</td>
                </tr>

                <tr>
                  <td style={cellLabel}>Detection Type</td>
                  <td style={cellValue}>Suspicious Web Behavior</td>
                </tr>

                <tr>
                  <td style={cellLabel}>Risk Level</td>
                  <td style={cellValue}>
                    <span
                      style={{
                        background: "#fce8e6",
                        color: "#c5221f",
                        padding: "4px 9px",
                        borderRadius: 4,
                      }}
                    >
                      HIGH — SIMULATED
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style={cellLabel}>Incident ID</td>
                  <td style={cellValue}>DEMO-SEC-001</td>
                </tr>

                <tr>
                  <td style={cellLabel}>Status</td>
                  <td style={cellValue}>Blocked by simulation</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ marginTop: 35 }}>Security Events</h3>

            <div style={logBox}>
              <div>[16:28:41] Request received</div>
              <div>[16:28:42] Page behavior analyzed</div>
              <div>[16:28:42] Suspicious resource detected</div>
              <div>[16:28:43] Navigation blocked</div>
              <div>[16:28:43] Security warning displayed</div>
            </div>

            <h3 style={{ marginTop: 30 }}>Recommended Investigation</h3>

            <ul style={{ lineHeight: 1.9 }}>
              <li>Inspect network requests.</li>
              <li>Review application logs.</li>
              <li>Check recently modified files.</li>
              <li>Audit third-party dependencies.</li>
              <li>Review authentication and access logs.</li>
              <li>Check Content Security Policy violations.</li>
              <li>Verify unexpected redirects.</li>
            </ul>

            <button
              onClick={() => setDetails(false)}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                background: "#1a73e8",
                color: "white",
                border: 0,
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------
  // MAIN WARNING SCREEN
  // -------------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#df2d23",
        color: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: 520,
          margin: "0 auto",
          paddingTop: 98,
        }}
      >
        {/* WARNING ICON */}

        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "28px solid transparent",
            borderRight: "28px solid transparent",
            borderBottom: "49px solid white",
            position: "relative",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -4,
              top: 17,
              color: "#df2d23",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            !
          </span>
        </div>

        <h1
          style={{
            fontSize: 21,
            fontWeight: 400,
            margin: "0 0 17px",
          }}
        >
          The site ahead contains harmful programs
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: "23px",
            margin: 0,
          }}
        >
          Attackers on{" "}
          <span
            style={{
              background: "white",
              color: "white",
              display: "inline-block",
              width: 82,
              height: 15,
              verticalAlign: "middle",
            }}
          >
            localhost
          </span>{" "}
          might attempt to trick you into installing programs that harm your
          browsing experience (for example, by changing your homepage or
          showing extra ads on sites you visit).{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDetails(true);
            }}
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            Learn more
          </a>
        </p>

        {/* CHECKBOX */}

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginTop: 32,
            fontSize: 13,
            lineHeight: "19px",
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{
              width: 14,
              height: 14,
              margin: "1px 7px 0 0",
            }}
          />

          <span>
            Help improve Safe Browsing by sending some system information and
            page content to Google.
          </span>
        </div>

        <div
          style={{
            marginLeft: 21,
            marginTop: 4,
            fontSize: 13,
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(
                "Privacy policy: This is a local cybersecurity training simulation. No information is sent anywhere."
              );
            }}
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            Privacy policy
          </a>
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 43,
            width: 503,
          }}
        >
          <button
            onClick={() => setDetails(true)}
            style={{
              color: "white",
              background: "transparent",
              border: "1px solid white",
              borderRadius: 4,
              padding: "8px 13px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Details
          </button>

          <button
            onClick={() => setIncident(false)}
            style={{
              color: "#5f6368",
              background: "white",
              border: "none",
              borderRadius: 4,
              padding: "9px 16px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Back to safety
          </button>
        </div>

        {/* DEMO-ONLY CONTROL */}

        <div
          style={{
            marginTop: 65,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,.25)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginBottom: 8,
            }}
          >
            CONTROLLED CYBERSECURITY TRAINING
          </div>

          <button
            onClick={() => setUnsafe(true)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,.5)",
              color: "white",
              padding: "7px 11px",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 11,
            }}
          >
            Simulate unsafe continuation
          </button>
        </div>
      </div>
    </div>
  );
}

const cellLabel = {
  padding: "12px 8px",
  borderBottom: "1px solid #eee",
  fontWeight: "bold",
  width: "40%",
};

const cellValue = {
  padding: "12px 8px",
  borderBottom: "1px solid #eee",
};

const logBox = {
  background: "#202124",
  color: "#e8eaed",
  padding: 18,
  borderRadius: 6,
  fontFamily: "monospace",
  fontSize: 13,
  lineHeight: 2,
};

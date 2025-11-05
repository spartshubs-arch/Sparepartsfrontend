// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "../../components/Header";

// const UserLayout = () => {
//   return (
//     <>
//       <Header />
//       <div className="p-4">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default UserLayout;



import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer"; 
const UserLayout = () => {
  return (
    <>
      <Header />
      <div className="pmin-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;

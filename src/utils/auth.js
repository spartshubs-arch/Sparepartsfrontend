// export const isVendorLoggedIn = () => {
//   const token = localStorage.getItem("vendorToken");
//   return !!token; // returns true if token exists
// };



export const isVendorLoggedIn = () => {
  return !!sessionStorage.getItem("vendorToken");
};
export const isAdminLoggedIn = () => {
  return !!sessionStorage.getItem("adminToken");
};

export const getVendorInfo = () => {
  const info = sessionStorage.getItem("vendorInfo");
  return info ? JSON.parse(info) : null;
};

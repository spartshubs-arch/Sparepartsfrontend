
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import CarSidebar from "../../components/CarSidebar1";
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/bannerhome.jpeg";

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const searchParams = new URLSearchParams(location.search);
  const [conditionToggle, setConditionToggle] = useState("all");

  const [filters, setFilters] = useState({
    make: searchParams.get("make") || state?.make || "",
    model: searchParams.get("model") || state?.model || "",
    name: searchParams.get("name") || "",
    condition: searchParams.get("condition") || "",
    year: "",
    variant: "",
    bodyType: "",
    productNo: searchParams.get("productNo") || ""
  });

  const [carDetails, setCarDetails] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get("/carDetails/all")
      .then(res => setCarDetails(res.data.cars))
      .catch(err => console.error(err));

    axios.get("/products/all-admin")
      .then(res => setAllProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Global filtering for ALL products (not just when make+model)
  useEffect(() => {
    let result = allProducts.filter(p =>
      (!filters.make || p.make === filters.make) &&
      (!filters.model || p.model === filters.model) &&
      (!filters.year || p.year === +filters.year) &&
      (!filters.variant || p.variant === filters.variant) &&
      (!filters.bodyType || p.bodyType === filters.bodyType) &&
      (!filters.condition || p.condition?.toLowerCase() === filters.condition.toLowerCase()) &&
      (!filters.name || p.ProductName.toLowerCase().includes(filters.name.toLowerCase()))&&
     (!filters.productNo || p.ProductNo?.toString().toLowerCase().includes(filters.productNo.toLowerCase())) 

    );

    setFilteredProducts(result);
  }, [filters, allProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const displayedProducts = filteredProducts; // ✅ always use filteredProducts

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-4 bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <CarSidebar
          onModelSelect={(make, model) => {
            setFilters({
              make,
              model,
              year: "",
              variant: "",
              bodyType: "",
              condition: filters.condition, 
              name: filters.name
            });
          }}
        />

        {/* Filter Options */}
        <div className="space-y-2">
          {["year", "variant", "bodyType"].map((key) => (
            <select
              key={key}
              name={key}
              value={filters[key]}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded"
            >
              <option value="">{`Select ${key}`}</option>
              {Array.from(
                new Set(
                  carDetails
                    .filter(
                      (cd) =>
                        (!filters.make || cd.make === filters.make) &&
                        (!filters.model || cd.model === filters.model)
                    )
                    .map((cd) => cd[key])
                )
              ).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Content: Banner + Products */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Banner */}
        <img
          src={banner}
          alt="Shop Banner"
          className="w-full h-40 sm:h-52 object-cover rounded-md shadow"
        />

        {/* Toggle New / Used Filter */}
        <div className="flex justify-end">
          <div className="bg-white rounded-full shadow-md flex items-center">
            <button
              onClick={() => {
                setConditionToggle("new");
                setFilters((prev) => ({ ...prev, condition: "new" }));
              }}
              className={`px-4 py-2 rounded-l-full font-medium transition ${
                conditionToggle === "new"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              New
            </button>

            <button
              onClick={() => {
                setConditionToggle("used");
                setFilters((prev) => ({ ...prev, condition: "used" }));
              }}
              className={`px-4 py-2 rounded-r-full font-medium transition ${
                conditionToggle === "used"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Used
            </button>

            <button
              onClick={() => {
                setConditionToggle("all");
                setFilters((prev) => ({ ...prev, condition: "" }));
              }}
              className={`px-4 py-2 rounded-full font-medium transition ml-2 ${
                conditionToggle === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {displayedProducts.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedProducts.map((prod) => (
              <div
                key={prod._id}
                onClick={() => navigate(`/product/${prod._id}`)} 
                className="group relative border rounded bg-white shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
              >
                <img
                  src={prod.watermarkedImages?.[0] || prod.images?.[0]}
                  alt={prod.ProductName}
                  className="w-full h-48 object-contain p-2 bg-gray-50"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {prod.ProductName}
                  </h3>
                    {/* {prod.ProductNo && (
    <p className="text-xs text-gray-500 mt-0.5">
      Product No: <span className="font-medium text-gray-700">{prod.ProductNo}</span>
    </p>
  )} */}
  {prod.ProductNo && (
  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium inline-block mt-1">
    #{prod.ProductNo}
  </span>
)}

                  {(prod.make || prod.model || prod.year) && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      {prod.make && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {prod.make}
                        </span>
                      )}
                      {prod.model && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {prod.model}
                        </span>
                      )}
                      {prod.year && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                          {prod.year}
                        </span>
                      )}
                    </div>
                  )}

                  {prod.condition && (
                    <p className="text-xs text-gray-500">
                      Condition:{" "}
                      <span className="font-medium">{prod.condition}</span>
                    </p>
                  )}
                  <p className="text-red-600 font-bold text-md">
                    AED {Number(prod.price).toFixed(2)}
                  </p>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition pointer-events-none">
                  View Details
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

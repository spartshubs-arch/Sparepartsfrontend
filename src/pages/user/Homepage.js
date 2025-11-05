
import banner from "../../assets/bannerhome.jpg";
import review from '../../assets/reviews.png'
import CarSidebar from "../../components/CarSidebar1";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import ToyotaLogo from '../../assets/toyota.png';
import FordLogo from '../../assets/ford.png';
import HyundaiLogo from '../../assets/hyundai.png';
import AudiLogo from "../../assets/audi.png";
import MazdaLogo from '../../assets/mazda.png';
import HondaLogo from '../../assets/honda.png';
import BMWLogo from '../../assets/bmw.png';
import SubaruLogo from '../../assets/subaru.png';
import JeepLogo from '../../assets/jeep.png';
import JaguarLogo from "../../assets/jaguar.png";
import Select from 'react-select';

export default function Home() {
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
  const [make, setMake] = useState('');
const [model, setModel] = useState('');
const [partName, setPartName] = useState('');
const [condition, setCondition] = useState("");
  const [categoryBanners, setCategoryBanners] = useState([]);
const [selectedYear, setSelectedYear] = useState('');
const [productNo, setProductNo] = useState('');




// Put this above the return:
const yearOptions = Array.from({ length: 25 }, (_, i) => {
  const year = 2000 + i;
  return { value: year, label: year };
});


   // Arrays for suggestions
  const makesList = ["Toyota", "Tesla", "Tata", "Honda", "Hyundai", "Ford", "Fiat", "BMW", "Audi"];
  const modelsList = ["Corolla", "Camry", "Model S", "Model 3", "Nexon", "Civic", "Accord", "i20"];
  const partsList = ["Tyre", "Transmission", "Turbocharger", "Tail Light", "Timing Belt", "Clutch", "Brake Pads"];

  // Refs for click outside
  const makeRef = useRef(null);
  const modelRef = useRef(null);
  const partRef = useRef(null);



  
  const filterSuggestions = (input, list) => {
    if (!input) return [];
    return list.filter(item => item.toLowerCase().includes(input.toLowerCase()));
  };

  const makeSuggestions = filterSuggestions(make, makesList);
  const modelSuggestions = filterSuggestions(model, modelsList);
  const partSuggestions = filterSuggestions(partName, partsList);

  const handleModelSelect = (make, model) => {
navigate(`/shop?make=${make}&model=${model}`);

  };

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axios.get("/upload/sliders?type=slider");
        setSliders(res.data);
      } catch (err) {
        console.error("Failed to fetch sliders", err);
      }
    };



    
    const fetchCategoryBanners = async () => {
      try {
        const res = await axios.get("/upload/sliders?type=category");
        setCategoryBanners(res.data);
      } catch (err) {
        console.error("Failed to fetch category banners", err);
      }
    };
    fetchSliders();
        fetchCategoryBanners();

  }, []);


  
  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (makeRef.current && !makeRef.current.contains(e.target)) setMake(prev => prev.trim());
      if (modelRef.current && !modelRef.current.contains(e.target)) setModel(prev => prev.trim());
      if (partRef.current && !partRef.current.contains(e.target)) setPartName(prev => prev.trim());
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topBanner = categoryBanners.length > 0 ? categoryBanners[0] : null;

return (
<div className="w-full ">

    {/* Top Banner Section with Text and Search */}
<div
  className="relative  h-screen flex flex-col justify-center items-center text-white overflow-hidden m-0 p-0"
>
  {topBanner ? (
    topBanner.imageUrl.endsWith(".mp4") || topBanner.imageUrl.endsWith(".webm") ? (
      <video
        className="absolute bottom-0 left-0 w-full h-full object-cover z-0 "
        src={topBanner.imageUrl}
        autoPlay
        muted
        loop
      />
    ) : (
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${topBanner.imageUrl})` }}
      />
    )
  ) : (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 z-0" />
  )}

  {/* Overlay Title */}
  <div className="relative z-10 bg-black bg-opacity-50 p-4 rounded mb-4 text-center w-11/12 max-w-6xl">
    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
      Find Genuine Spare Parts for Your Vehicle
    </h1>
    <p className="mt-2 text-xs sm:text-sm md:text-base">
      Reliable – Verified – Fast Delivery
    </p>
  </div>

{/* Search Form */}
<div className="relative z-10 flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 bg-white bg-opacity-80 p-4 rounded shadow-md w-11/12 max-w-6xl">

  {/* Car Make Input */}
  <input
    type="text"
    placeholder="Car Make"
    value={make}
    onChange={(e) => {
      const value = e.target.value;
      setMake(value.charAt(0).toUpperCase() + value.slice(1));
    }}
    list="makeSuggestions"
    className="border border-orange-500 px-4 py-2 rounded w-full md:w-48 text-black"
  />
  <datalist id="makeSuggestions">
    {makeSuggestions?.map((suggestion, idx) => (
      <option key={idx} value={suggestion} />
    ))}
  </datalist>

  {/* Car Model Input */}
  <input
    type="text"
    placeholder="Car Model"
    value={model}
    onChange={(e) => {
      const value = e.target.value;
      setModel(value.charAt(0).toUpperCase() + value.slice(1));
    }}
    list="modelSuggestions"
    className="border border-orange-500 px-4 py-2 rounded w-full md:w-48 text-black"
  />
  <datalist id="modelSuggestions">
    {modelSuggestions?.map((suggestion, idx) => (
      <option key={idx} value={suggestion} />
    ))}
  </datalist>

  {/* Spare Part Name */}
  <input
    type="text"
    placeholder="Spare Part Name"
    value={partName}
    onChange={(e) => {
      const value = e.target.value;
      setPartName(value.charAt(0).toUpperCase() + value.slice(1));
    }}
    list="partSuggestions"
    className="border border-orange-500 px-4 py-2 rounded w-full md:w-48 text-black"
  />
  <datalist id="partSuggestions">
    {partSuggestions?.map((suggestion, idx) => (
      <option key={idx} value={suggestion} />
    ))}
  </datalist>

  {/* Select Year */}
  <Select
    value={selectedYear ? { value: selectedYear, label: selectedYear } : null}
    onChange={(option) => setSelectedYear(option?.value || "")}
    options={yearOptions}
    placeholder="Year"
    className="w-full md:w-40"
    styles={{
      menuPortal: (base) => ({ ...base, zIndex: 9999 }), // fixes overlap
    }}
    menuPortalTarget={document.body}
  />

  {/* Condition Selector */}
  <select
    value={condition}
    onChange={(e) => setCondition(e.target.value)}
    className="border border-orange-500 px-4 py-2 rounded w-full md:w-40 text-black"
  >
    <option value="">Condition</option>
    <option value="New">New</option>
    <option value="Used">Used</option>
  </select>

  {/* Search Button */}
  <button
    onClick={() => {
      const query = new URLSearchParams({
        make,
        model,
        name: partName,
        condition,
        year: selectedYear,
      }).toString();
      navigate(`/shop?${query}`);
    }}
    className="bg-orange-500 text-black px-6 py-2 rounded hover:bg-orange-600 w-full md:w-auto"
  >
    Search
  </button>

</div>
{/* Product Number Quick Search */}
<div className="relative z-10 mt-4 flex justify-center w-full">
  <div className="flex flex-col md:flex-row items-center bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-md w-11/12 max-w-xl">
    
    {/* Input */}
    <input
      type="text"
      placeholder="Enter Product No"
      value={productNo}
      onChange={(e) => setProductNo(e.target.value)}
      className="md:flex-grow border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-3/4 md:w-auto"
    />
    
    {/* Button */}
    <button
      onClick={() => {
        if (productNo.trim()) {
          navigate(`/shop?productNo=${productNo}`);
        }
      }}
      className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition md:w-auto w-full mt-2 md:mt-0"
    >
      Search by No
    </button>
  </div>
</div>


</div>





     {/* Car Sidebar Dropdown Section */}
<div className="flex flex-col md:flex-row mt-6 gap-4">
  <div className="w-full md:w-60 lg:w-64 xl:w-72">
    <CarSidebar onModelSelect={handleModelSelect} />
  </div>


        <div className="flex-2 p-4">
          <div className="flex justify-center mb-3">
            <div className="bg-white-800 text-orange-600 px-6 py-3 rounded shadow-md font-semibold text-center text-lg animate-pulse">
              <span className="mr-3 animate-bounce text-3xl"></span>
              FEATURED PRODUCTS
            </div>
          </div>
<div className="w-full mb-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {sliders.map((slider) => (
      <div
        key={slider._id}
        className="relative bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      >
        {/* Image */}
        <img
          src={slider.imageUrl}
          alt={slider.title}
          className="w-full h-64 object-cover"
        />

        {/* Overlay text */}
       <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-1">
  <h3 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300 drop-shadow-lg mb-2 text-center animate-pulse">
    {slider.subtitle}
  </h3>
  <div className="flex justify-center">
<Link to="/shop">
  <button className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 ">
    Explore!
  </button>
</Link>
</div>

        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>

{/* Premium Brands Scrolling Section */}
<div className="bg-white py-12 px-4 mt-20 overflow-hidden">
 
    
    <h2 className="text-3xl font-bold mb-8 text-center">
      Most valuable brands <br className="hidden sm:block" /> are available
    </h2>

   {/* Scrolling Container */}
<div className="relative w-full overflow-hidden  ">
  <div
    className="flex animate-scroll gap-12"
    style={{
      animation: "scroll 20s linear infinite",
      width: "max-content", // fit content instead of fixed 200%
    }}
  >
    {/* First set of logos */}
    <div className="flex gap-12">
      <img src={ToyotaLogo} alt="Toyota" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={FordLogo} alt="Ford" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={HyundaiLogo} alt="Hyundai" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={AudiLogo} alt="Audi" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={MazdaLogo} alt="Mazda" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={HondaLogo} alt="Honda" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={BMWLogo} alt="BMW" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={SubaruLogo} alt="Subaru" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={JeepLogo} alt="Jeep" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={JaguarLogo} alt="Jaguar" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
    </div>

    {/* Duplicate set for seamless loop */}
    <div className="flex gap-12">
      <img src={ToyotaLogo} alt="Toyota" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={FordLogo} alt="Ford" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={HyundaiLogo} alt="Hyundai" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={AudiLogo} alt="Audi" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={MazdaLogo} alt="Mazda" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={HondaLogo} alt="Honda" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={BMWLogo} alt="BMW" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={SubaruLogo} alt="Subaru" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={JeepLogo} alt="Jeep" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
      <img src={JaguarLogo} alt="Jaguar" className="h-20 sm:h-24 md:h-28 object-contain flex-shrink-0" />
    </div>
  </div>
</div>
</div>

{/* Promotional Banner Section Full Width */}
<div
  className="relative w-full h-[600px] mt-[100px] rounded-2xl overflow-hidden flex justify-center items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${banner})` }}
>
  {/* Overlay + Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40 p-6 text-center">
    <h2 className="text-4xl font-bold mb-4">
      Car Parts That Exceed Your Expectations
    </h2>
    <p className="mb-4 max-w-2xl">
      Strong relationships and mutual care build lasting success. New
      opportunities grow when we work together, creating a foundation of
      trust, respect, and shared achievement
    </p>
    <Link to="/shop">
      <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded shadow hover:bg-orange-600">
        Go To Shop !
      </button>
    </Link>
  </div>
</div>

{/* Stats Box - moved OUTSIDE the rounded container */}
<div className="relative -mt-12 flex justify-center">
  <div className="w-[90%] bg-white shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 py-6 rounded-2xl">
    <div className="text-center">
      <h3 className="text-3xl font-extrabold">
        2,500<span className="text-orange-500"> +</span>
      </h3>
      <p className="text-gray-600">Brand Product</p>
    </div>
    <div className="text-center">
      <h3 className="text-3xl font-extrabold">
        96<span className="text-orange-500"> %</span>
      </h3>
      <p className="text-gray-600">Customer Satisfaction</p>
    </div>
    <div className="text-center">
      <h3 className="text-3xl font-extrabold">
        120<span className="text-orange-500"> +</span>
      </h3>
      <p className="text-gray-600">Offline Store</p>
    </div>
    <div className="text-center">
      <h3 className="text-3xl font-extrabold">
        75<span className="text-orange-500"> +</span>
      </h3>
      <p className="text-gray-600">Professional Team</p>
    </div>
  </div>
</div>


      {/* About Us Concept Section Based on Image */}
<div className="w-full bg-white mt-28 px-4 md:px-12 lg:px-24 py-12">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
    
    {/* Left: Image with Badge */}
    <div className="relative w-full lg:w-1/2 flex justify-center">
      <img
        src={review} 
        alt="Auto Parts"
        className="w-full max-w-[600px] h-auto rounded-2xl shadow-lg mt-6 sm:mt-[60px] object-cover"
      />
      <div className="absolute top-4 left-4 bg-white px-6 py-4 rounded-xl shadow-lg text-center">
        <h2 className="text-4xl font-bold text-orange-500">24+</h2>
        <p className="text-gray-800 text-sm font-semibold">Years Experience</p>
      </div>
    </div>

    {/* Right: Text Content */}
    <div className="w-full lg:w-1/2">
      <p className="text-sm font-semibold text-gray-500 uppercase mb-2">About Us</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        The Driving Force of Engineering,<br /> Powered by Reliability
      </h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
       At Spare Part Hub, we specialize in delivering high-quality auto parts that keep vehicles running smoothly. With over two decades in the industry, our passion for precision and performance has helped us become a trusted name among mechanics, workshops, and car owners.
      </p>

      {/* Services */}
      <div className="space-y-6">
        {/* Auto Part Store */}
        <div className="flex items-start gap-4">
          <div className="bg-orange-500 p-3 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-8 0v2M5 11h14l1 9H4l1-9z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-900">Auto Part Store</h4>
            <p className="text-gray-600 text-sm">
We stock a wide range of OEM and aftermarket car components for different makes and models. From engine components to accessories, our store is designed to be a one-stop solution for every automotive need.            </p>
          </div>
        </div>

        {/* Auto Service */}
        <div className="flex items-start gap-4">
          <div className="bg-orange-500 p-3 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-900">Auto Service</h4>
            <p className="text-gray-600 text-sm">
Our team is committed to helping customers find the right fit every time. With expert guidance, fast response, and reliable service, we ensure a smooth experience — whether you're replacing a part or upgrading performance.            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Features 4 icons */}
<div className="w-full bg-white py-12 px-4 md:px-12 lg:px-24">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    
    {/* Feature 1 */}
    <div className="flex items-start gap-4 sm:border-r border-gray-200 pr-4">
      <div className="text-orange-500 text-3xl">
        <i className="fas fa-truck"></i>
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900">Free Shipping</h4>
        <p className="text-gray-600 text-sm">
          Donec eros laoreet auctor nostra in platea porttitor suscipit.
        </p>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex items-start gap-4 sm:border-r border-gray-200 pr-4">
      <div className="text-orange-500 text-3xl">
        <i className="fas fa-credit-card"></i>
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900">Secure Payment</h4>
        <p className="text-gray-600 text-sm">
          Donec eros laoreet auctor nostra in platea porttitor suscipit.
        </p>
      </div>
    </div>

    {/* Feature 3 */}
    <div className="flex items-start gap-4 sm:border-r border-gray-200 pr-4">
      <div className="text-orange-500 text-3xl">
        <i className="fas fa-shield-alt"></i>
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900">30 Days Warranty</h4>
        <p className="text-gray-600 text-sm">
          Donec eros laoreet auctor nostra in platea porttitor suscipit.
        </p>
      </div>
    </div>

    {/* Feature 4 */}
    <div className="flex items-start gap-4">
      <div className="text-orange-500 text-3xl">
        <i className="fas fa-headset"></i>
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900">24/7 Support</h4>
        <p className="text-gray-600 text-sm">
          Donec eros laoreet auctor nostra in platea porttitor suscipit.
        </p>
      </div>
    </div>

  </div>
</div>

</div>
);
}
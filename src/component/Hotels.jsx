import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import i18n from "../i18n"; // ✅ import your i18n setup
import { useTranslation } from "react-i18next";

// Assets
import logo from "./../assets/logotip.svg";
import bgImage from "./../assets/bg1.jpg";
import bgImage1 from "./../assets/hotel.svg";
// i18n initialization


function escapeRegExp(string = "") {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const highlightMatch = (text, query) => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-300 px-1 rounded animate-fadeIn">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export default function HotelWithNavbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Excursions state
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  useEffect(() => {
    fetch("https://turist-1.onrender.com/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Fetch all hotels error:", err));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(
          `https://turist-1.onrender.com/api/hotels?query=${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Hotel search error:", err);
            setLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  let displayedHotels = query.trim() === "" ? hotels : searchResults;
  if (cityFilter) {
    displayedHotels = displayedHotels.filter(
      (hotel) => String(hotel.city.id) === cityFilter
    );
  }
  if (priceSort) {
    displayedHotels = [...displayedHotels].sort((a, b) =>
      priceSort === "low-high" ? a.price - b.price : b.price - a.price
    );
  }
  if (ratingSort) {
    displayedHotels = [...displayedHotels].sort((a, b) =>
      ratingSort === "high-low" ? b.rating - a.rating : a.rating - b.rating
    );
  }

  const cities = [
    ...new Map(hotels.map((hotel) => [hotel.city.id, hotel.city])).values(),
  ];

  return (
    <div className="min-h-screen font-sans" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* Navbar */}
      <header className="bg-white shadow-md px-4 py-3">
        <div className="flex justify-between container mx-auto items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-lg font-bold">Syýahat hyzmatlary</h1>
          </div>
          <nav className="hidden sm:flex gap-6 items-center">
            <NavLink className="text-lg font-bold" to="/">{t("home")}</NavLink>
            <NavLink className="bg-orange-400 font-semibold text-white px-3 py-1 rounded" to="/hotels">{t("hotels")}</NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">{t("excursions")}</NavLink>
            <NavLink  className="text-lg font-bold" to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="text-lg font-bold" to="/contact">{t("contacts")}</NavLink>
            <div className="flex items-center space-x-3">
              <select value={language} onChange={changeLanguage} className="border rounded p-2">
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </nav>
          <button onClick={toggleMenu} className="sm:hidden">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col items-start gap-4 sm:hidden">
            <NavLink className="text-lg font-bold" to="/">{t("home")}</NavLink>
            <NavLink className="bg-orange-400 font-bold text-white px-3 py-1 rounded" to="/hotels">{t("hotels")}</NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">{t("excursions")}</NavLink>
            <NavLink  className="text-lg font-bold" to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="text-lg font-bold" to="/contact">{t("contacts")}</NavLink>
            <div className="flex items-center space-x-3">
              <select value={language} onChange={changeLanguage} className="border rounded p-2">
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Excursions Section */}
      <div className="w-full h-40 items-center brightness-95" style={{
        backgroundImage: `url(${bgImage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">
            {t("hotels")}
          </h2>

          {/* Search + Filters */}
          <section className="flex flex-col sm:flex-row items-center gap-2 justify-center">
            <input
              type="text"
              placeholder={t("search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border px-4 py-2 w-full sm:w-1/2 rounded-md"
            />
<div className="flex flex-row sm:flex-row pt-6 gap-2 justify-center mb-6 px-4">
  {/* City Filter */}
  <select
    value={cityFilter}
    onChange={(e) => setCityFilter(e.target.value)}
    className="border px-2 py-2 rounded-md w-full sm:w-auto"
  >
    <option value="">{t("allCities")}</option>
    {cities.map((city) => (
      <option key={city.id} value={city.id}>
        {city[`name_${language}`]}
      </option>
    ))}
  </select>

  {/* Price Sort */}
  <select
    value={priceSort}
    onChange={(e) => setPriceSort(e.target.value)}
    className="border px-2 py-2 rounded-md w-full sm:w-auto"
  >
    <option value="">{t("sortByPrice")}</option>
    <option value="low-high">{t("lowToHigh")}</option>
    <option value="high-low">{t("highToLow")}</option>
  </select>

  {/* Rating Sort */}
  <select
    value={ratingSort}
    onChange={(e) => setRatingSort(e.target.value)}
    className="border px-2 py-2 rounded-md w-full sm:w-auto"
  >
    <option value="">{t("sortByRating")}</option>
    <option value="high-low">{t("highToLowRating")}</option>
    <option value="low-high">{t("lowToHighRating")}</option>
  </select>
</div>
          </section>

          {loading && <p className="text-center text-gray-600 text-lg">{t("loading")}</p>}

          {/* Hotels Grid */}
          <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {displayedHotels.map((hotel) => {
    const name = hotel[`name_${language}`] || hotel.name || "";
    const cityName = hotel.city ? hotel.city[`name_${language}`] : "";
    const imageSrc = hotel.image
      ? `https://turist-1.onrender.com/static/uploads/${hotel.image}`
      : "";

    return (
      <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
        <div className="bg-white rounded-md hover:shadow-lg transition">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-48 sm:h-60 object-cover rounded-md"
            />
          )}
          <div className="p-4 space-y-2 text-center">
            <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              {t("recommended")}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-blue-800">
              {highlightMatch(name, query)}
            </h2>
            <p className="text-sm text-gray-600">{cityName}</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-24 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${(hotel.rating / 5) * 100}%` }}
                />
              </div>
              <span className="text-gray-600">
                {hotel.rating} (
                <span className="text-blue-600 underline">
                  195 {t("reviews")}
                </span>
                )
              </span>
            </div>
            <p className="text-orange-500 font-semibold text-lg">
              {t("from")} {hotel.price} тмт
            </p>
            <p className="text-xs text-gray-500">{t("priceForTwo")}</p>
            <button className="mt-2 w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
              {t("details")}
            </button>
          </div>
        </div>
      </Link>
    );
  })}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Assets
import logo from "./../assets/logotip.svg";
import bgImage from "./../assets/bg1.jpg";
import bgImage1 from "./../assets/excursion.png";

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

export default function ExcursionWithNavbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Excursions state
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetch("https://turist-1.onrender.com/api/attractions")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Fetch attractions error:", err));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(
          `https://turist-1.onrender.com/api/attractions?query=${encodeURIComponent(
            query
          )}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Attraction search error:", err);
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
  if (typeFilter) {
    displayedHotels = displayedHotels.filter(
      (hotel) => hotel.type && hotel.type.toLowerCase() === typeFilter
    );
  }

  const cities = [
    ...new Map(hotels.map((hotel) => [hotel.city.id, hotel.city])).values(),
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <header className="bg-white shadow-md px-4 py-3">
        <div className="flex justify-between container mx-auto items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-lg font-bold">Syýahat hyzmatlary</h1>
          </div>
          <nav className="hidden sm:flex gap-6 items-center">
            <NavLink className="text-lg font-bold" to="/">{t("home")}</NavLink>
            <NavLink className="text-lg font-bold" to="/hotels">{t("hotels")}</NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">{t("excursions")}</NavLink>
            <NavLink className="bg-orange-400 font-semibold text-white px-3 py-1 rounded"  to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="text-lg font-bold" to="/contact">{t("contacts")}</NavLink>
            <div className="flex items-center space-x-3">
              <select
                value={i18n.language}
                onChange={changeLanguage}
                className="border rounded p-2"
              >
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
            <NavLink className="text-lg font-bold" to="/hotels">{t("hotels")}</NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">{t("excursions")}</NavLink>
            <NavLink className="bg-orange-400 font-semibold text-white px-3 py-1 rounded"  to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="text-lg font-bold" to="/contact">{t("contacts")}</NavLink>
            <div className="flex items-center space-x-3">
              <select
                value={i18n.language}
                onChange={changeLanguage}
                className="border rounded p-2"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Excursions Section */}
      <div
        className="w-full h-40 items-center brightness-95"
        style={{
          backgroundImage: `url(${bgImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">
            {t("attractions")}
          </h2>

          {/* Search + Filters */}
          <section className="flex flex-col sm:flex-row items-center gap-2 justify-center">
            <input
              type="text"
              placeholder={t("searchHotels")}
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
                    {city[`name_${i18n.language}`]}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border px-2 py-2 rounded-md w-full sm:w-auto"
              >
                <option value="">{t("allTypes")}</option>
                <option value="historical">{t("historical")}</option>
                <option value="city">{t("city")}</option>
              </select>
            </div>
          </section>
          {loading && (
            <p className="text-center text-gray-600 text-lg">{t("loading")}</p>
          )}

          <div className="max-w-5xl mx-auto p-6 space-y-8">
            {displayedHotels.map((hotel) => {
              const name = hotel[`name_${i18n.language}`] || hotel.name || "";
              const cityName = hotel.city ? hotel.city[`name_${i18n.language}`] : "";
              const imageSrc = hotel.image
                ? `https://turist-1.onrender.com/static/uploads/${hotel.image}`
                : "";

              return (
                <div
                  key={hotel.id}
                  className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={name}
                      className="w-full h-48 sm:h-60 sm:w-1/3 object-cover rounded-md"
                    />
                  )}

                  {/* Content */}
                  <div className="p-4 sm:w-2/3 space-y-3">
                    <h2 className="text-lg font-bold text-blue-800">
                      {highlightMatch(name, query)}
                    </h2>

                    <p className="text-sm text-gray-600">{cityName}</p>

                    {/* Type */}
                    <p className="text-sm text-gray-500">
                      {t("type")}: {hotel.type ? t(hotel.type) : "-"}
                    </p>

                    <div className="w-full text-sm break-words whitespace-normal">
                      <p>{hotel[`description_${i18n.language}`]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

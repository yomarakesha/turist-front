import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useExcursions } from "../hooks/excursions";
import bgImage from "../assets/bg1.jpg";
import bgImage1 from "../assets/i.webp";

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
  const { t } = useTranslation();

  const {
    language,
    query,
    setQuery,
    displayedExcursions,
    loading,
    cities,
    cityFilter,
    setCityFilter,
    priceSort,
    setPriceSort,
  } = useExcursions();

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
            {t("excursions")}
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

              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="border px-2 py-2 rounded-md w-full sm:w-auto"
              >
                <option value="">{t("sortByPrice")}</option>
                <option value="low-high">{t("lowToHigh")}</option>
                <option value="high-low">{t("highToLow")}</option>
              </select>
            </div>
          </section>

          {loading && (
            <p className="text-center text-gray-600 text-lg">{t("loading")}</p>
          )}

          {/* Excursions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedExcursions.map((exc) => {
              const name = exc[`name_${language}`] || exc.name || "";
              const cityName = exc.city ? exc.city[`name_${language}`] : "";
              const imageSrc = exc.image
                ? `https://turist-1.onrender.com/static/uploads/${exc.image}`
                : "";

              return (
                <Link key={exc.id} to={`/excursions/${exc.id}`}>
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
                      <p className="text-orange-500 font-semibold text-lg">
                        {t("from")} {exc.price} тмт
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
  );
}

import { useTranslation } from "react-i18next";
import { useAttractions} from "../hooks/attractions";
import bgImage from "../assets/bg1.jpg";
import bgImage1 from "../assets/excursion.png";

function escapeRegExp(string = "") {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const highlightMatch = (text, query) => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <mark key={index} className="bg-yellow-300 px-1 rounded">{part}</mark> : part
  );
};

export default function ExcursionPage() {
  const { t, i18n } = useTranslation();
  const {
    displayedHotels,
    query,
    setQuery,
    loading,
    cityFilter,
    setCityFilter,
    typeFilter,
    setTypeFilter,
    cities
  } = useAttractions();

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <div
        className="w-full h-40 items-center brightness-95"
        style={{ backgroundImage: `url(${bgImage1})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">{t("attractions")}</h2>

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
              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="border px-2 py-2 rounded-md w-full sm:w-auto">
                <option value="">{t("allCities")}</option>
                {cities.map(city => <option key={city.id} value={city.id}>{city[`name_${i18n.language}`]}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border px-2 py-2 rounded-md w-full sm:w-auto">
                <option value="">{t("allTypes")}</option>
                <option value="historical">{t("historical")}</option>
                <option value="city">{t("city")}</option>
              </select>
            </div>
          </section>

          {loading && <p className="text-center text-gray-600 text-lg">{t("loading")}</p>}

          <div className="max-w-5xl mx-auto p-6 space-y-8">
            {displayedHotels.map(hotel => (
              <div key={hotel.id} className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden">
                {hotel.image && <img src={`https://turist.onrender.com/static/uploads/${hotel.image}`} alt={hotel.name} className="w-full h-48 sm:h-60 sm:w-1/3 object-cover rounded-md" />}
                <div className="p-4 sm:w-2/3 space-y-3">
                  <h2 className="text-lg font-bold text-blue-800">{highlightMatch(hotel[`name_${i18n.language}`] || hotel.name, query)}</h2>
                  <p className="text-sm text-gray-600">{hotel.city ? hotel.city[`name_${i18n.language}`] : ""}</p>
                  <p className="text-sm text-gray-500">{t("type")}: {hotel.type ? t(hotel.type) : "-"}</p>
                  <div className="w-full text-sm break-words whitespace-normal">
                    <p>{hotel[`description_${i18n.language}`]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

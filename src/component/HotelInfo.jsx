import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import bgImage from "./../assets/bg1.jpg";
import logo from "./../assets/logotip.svg";

// i18n init
i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        home: "Главная",
        hotels: "Отели",
        excursions: "Экскурсии",
        attractions: "Достопримечательности",
        contacts: "Контакты",
        tour: "Подберите мне тур",
        loading: "Загрузка...",
        price: "Цена",
        rating: "Рейтинг",
      },
    },
    en: {
      translation: {
        home: "Home",
        hotels: "Hotels",
        excursions: "Excursions",
        attractions: "Attractions",
        contacts: "Contacts",
        tour: "Pick me a tour",
        loading: "Loading...",
        price: "Price",
        rating: "Rating",
      },
    },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default function HotelInfo() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data))
      .catch((err) => console.error("Error loading hotel:", err));
  }, [id]);

  if (!hotel) return <p className="text-center mt-10">{t("loading")}</p>;

  const name = hotel[`name_${language}`] || hotel.name_ru;
  const description = hotel[`description_${language}`] || hotel.description_ru;
  const cityName = hotel.city ? hotel.city[`name_${language}`] : "";

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800"
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

      {/* Hotel Info */}
      <main className="max-w-3xl mx-auto p-6 bg-white/95 backdrop-blur rounded-lg shadow-sm mt-8">
        <h1 className="text-2xl font-semibold mb-1">{name}</h1>
        <p className="text-gray-500 text-sm mb-4">{cityName}</p>

        <img
          src={`http://127.0.0.1:5000/static/uploads/${hotel.image}`}
          alt={name}
          className="w-full h-72 object-cover rounded-md mb-4"
        />

        <div className="flex items-center justify-between text-sm text-gray-700 border-t border-b py-2 mb-4">
          <span>
            {t("price")}: <strong>{hotel.price} тмт</strong>
          </span>
          <span>
            {t("rating")}: <strong>{hotel.rating}</strong>
          </span>
        </div>

        <p className="leading-relaxed text-gray-700 text-base">{description}</p>
      </main>
    </div>
  );
}

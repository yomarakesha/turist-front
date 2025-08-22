import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import logo from "./../assets/logotip.svg";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// i18n initialization
i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        siteName: "Название сайта",
        home: "Главная",
        hotels: "Отели",
        excursions: "Экскурсии",
        contacts: "Контакты",
        login: "Вход",
        tour: "Подберите мне тур",
        attractions: "Достопримечательности",
      },
    },
    en: {
      translation: {
        siteName: "Site Name",
        home: "Home",
        hotels: "Hotels",
        excursions: "Excursions",
        contacts: "Contacts",
        login: "Login",
        tour: "Pick me a tour",
        attractions: "Attractions",
      },
    },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default function NavBar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  // Локальное состояние языка, синхронизируем с i18n.language
  const [language, setLanguage] = useState(i18n.language);

  // При смене селекта меняем и локальное состояние, и i18n язык
  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);


  return (
    <header className="bg-white shadow-md px-4 py-3 font-sans">
      <div className="flex justify-between container mx-auto items-center">
        {/* Logo and site name */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-lg font-bold">{t("siteName")}</h1>
        </div>

        {/* Desktop menu */}
        <nav className="hidden sm:flex gap-6 text-blue-600 items-center">
          <NavLink to="/" className="hover:underline">{t("home")}</NavLink>
          <NavLink to="/hotels" className="hover:underline">{t("hotels")}</NavLink>
          <NavLink to="/excursion" className="hover:underline">{t("excursions")}</NavLink>
          <NavLink to="/attraction" className="hover:underline">{t("attractions")}</NavLink>
          <NavLink to="/contact" className="hover:underline">{t("contacts")}</NavLink>
          <button className="bg-orange-400 text-white px-3 py-1 rounded">{t("tour")}</button>

          {/* Новый блок выбора языка с label */}
          <div className="flex items-center space-x-3">
            <label className="font-semibold">Language:</label>
            <select
              value={language}
              onChange={changeLanguage}
              className="border rounded p-2"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </nav>

        {/* Burger menu button */}
        <button
          onClick={toggleMenu}
          className="focus:outline-none sm:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // Close icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Burger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col items-start gap-4 text-sm sm:hidden">
          <nav className="flex flex-col gap-4 text-blue-600 w-full">
            <NavLink to="/" onClick={toggleMenu}>{t("home")}</NavLink>
            <NavLink to="/hotels" onClick={toggleMenu}>{t("hotels")}</NavLink>
            <NavLink to="/excursion" onClick={toggleMenu}>{t("excursions")}</NavLink>
            <NavLink to="/attraction" onClick={toggleMenu}>{t("attractions")}</NavLink>
            <NavLink to="/contact" onClick={toggleMenu}>{t("contacts")}</NavLink>
          </nav>

          <div className="flex items-center gap-3 mt-2">
            <button className="bg-orange-400 text-white px-3 py-1 rounded">
              {t("tour")}
            </button>

            {/* Тот же блок выбора языка */}
            <div className="flex items-center space-x-3">
              <label className="font-semibold">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded p-2"
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

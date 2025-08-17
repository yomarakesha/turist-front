import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// Hooks
import useContacts from "../hooks/contact";

// Assets
import logo from "./../assets/logotip.svg";
import bgImage from "./../assets/bg1.jpg";
import bgImage1 from "./../assets/img/1.png";
import man from "./../assets/img/person.png";
import inst from "./../assets/img/instagram.png";
import tg from "./../assets/img/telegram.png";
import mail from "./../assets/img/gmail.png";
import phone from "./../assets/img/whatsapp.png";

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
        loading: "Загрузка...",
        contactTitle: "Контакты",
        contactDesc:
          "По вопросам, связанным с электронными услугами, вы можете позвонить по указанному ниже номеру и получить помощь.",
        contactSchedule: "График работы службы поддержки:",
        contactTime: "С понедельника по субботу: с 8:00 до 22:00",
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
        loading: "Loading...",
        contactTitle: "Contacts",
        contactDesc:
          "For questions related to e-services, you can call the number below and get assistance.",
        contactSchedule: "Support service hours:",
        contactTime: "Monday to Saturday: from 8:00 to 22:00",
      },
    },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default function ContactWithNavbar() {
  const { t } = useTranslation();
  const { loading } = useContacts();

  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
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
            <h1 className="text-lg font-bold">{t("siteName")}</h1>
          </div>
          <nav className="hidden sm:flex gap-6 text-blue-600 items-center">
            <NavLink to="/">{t("home")}</NavLink>
            <NavLink to="/hotels">{t("hotels")}</NavLink>
            <NavLink to="/excursion">{t("excursions")}</NavLink>
            <NavLink to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="bg-orange-400 text-white px-3 py-1 rounded"  to="/contact">{t("contacts")}</NavLink>
            <select
              value={language}
              onChange={changeLanguage}
              className="border rounded p-2"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </nav>
          <button onClick={toggleMenu} className="sm:hidden">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col items-start gap-4 sm:hidden">
            <NavLink to="/">{t("home")}</NavLink>
            <NavLink to="/hotels">{t("hotels")}</NavLink>
            <NavLink to="/excursion">{t("excursions")}</NavLink>
            <NavLink to="/attraction">{t("attractions")}</NavLink>
            <NavLink className="bg-orange-400 text-white px-3 py-1 rounded"  to="/contact">{t("contacts")}</NavLink>
            <select
              value={language}
              onChange={changeLanguage}
              className="border rounded p-2"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        )}
      </header>

      {/* Contact Section */}
      {loading ? (
        <p className="p-8 text-white">{t("loading")}</p>
      ) : (
        <div>
          {/* Banner */}
          <div className="relative w-full h-32 overflow-hidden">
            <div className="absolute inset-0">
              <div
                className="w-full h-32 items-center brightness-50"
                style={{
                  backgroundImage: `url(${bgImage1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full text-white p-8">
              <h2 className="text-center text-xl font-semibold sm:text-3xl">
                {t("contactTitle")}
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-800 font-medium mx-5 sm:mx-20 sm:text-xl">
            {t("contactDesc")}
          </p>
          <p className="mt-3 font-semibold text-gray-900 mx-5 sm:mx-20 sm:text-xl">
            {t("contactSchedule")}
            <br />
            <span className="text-black">{t("contactTime")}</span>
          </p>

          {/* Contact Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-4 rounded-lg">
            <div className="space-y-4 text-sm mx-10 sm:mx-20">
              <div className="flex items-center space-x-2">
                <img src={mail} alt="email" className="w-9 h-9" />
                <Link to="mailto:user@example.com">example@gmail.com</Link>
              </div>
              <div className="flex items-center space-x-2">
                <img src={phone} alt="phone" className="w-9 h-9" />
                <Link to="https://wa.me/447812345678">+993xxxxxxx</Link>
              </div>
              <div className="flex items-center space-x-2">
                <img src={tg} alt="telegram" className="w-9 h-9" />
                <Link to="https://t.me/username">t.me/example</Link>
              </div>
              <div className="flex items-center space-x-2">
                <img src={inst} alt="instagram" className="w-10 h-10" />
                <Link>@example</Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img src={man} alt="Support Illustration" className="w-96 h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

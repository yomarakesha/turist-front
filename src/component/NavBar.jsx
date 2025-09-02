import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logotip.svg";

export default function Navbar({ language, changeLanguage, menuOpen, toggleMenu }) {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between container mx-auto items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-lg font-bold">Syýahat hyzmatlary</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-6 items-center">
          <NavLink to="/" className="text-lg font-bold">{t("home")}</NavLink>
          <NavLink to="/hotels" className="text-lg font-bold">{t("hotels")}</NavLink>
          <NavLink to="/excursions" className="text-lg font-bold">{t("excursions")}</NavLink>
          <NavLink to="/attractions" className="text-lg font-bold">{t("attractions")}</NavLink>
          <NavLink to="/contact" className="text-lg font-bold">{t("contacts")}</NavLink>

          {/* Language Switcher */}
          <select value={language} onChange={changeLanguage} className="border rounded p-2">
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="sm:hidden">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col items-start gap-4 sm:hidden">
          <NavLink to="/" className="text-lg font-bold">{t("home")}</NavLink>
          <NavLink to="/hotels" className="text-lg font-bold">{t("hotels")}</NavLink>
          <NavLink to="/excursions" className="text-lg font-bold">{t("excursions")}</NavLink>
          <NavLink to="/attractions" className="text-lg font-bold">{t("attractions")}</NavLink>
          <NavLink to="/contact" className="text-lg font-bold">{t("contacts")}</NavLink>

          <select value={language} onChange={changeLanguage} className="border rounded p-2">
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      )}
    </header>
  );
}

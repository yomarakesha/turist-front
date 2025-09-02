import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HotelInfo from "./component/HotelInfo";
import ExcursionInfo from "./component/ExcursionInfo";

import Navbar from "./component/NavBar";

// Pages
import Home from "./component/Home";
import Hotels from "./component/Hotels";
import Excursions from "./component/Excursion";
import Attractions from "./component/Attraction";
import Contact from "./component/Contact";

function App() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang); // ✅ меняем язык глобально
  };

  // Если язык меняется снаружи, синхронизируем состояние
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <Router>
      <Navbar
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        language={language}
        changeLanguage={changeLanguage}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/excursions" element={<Excursions />} />
          <Route path="/hotels/:id" element={<HotelInfo />} />
          <Route path="/excursions/:id" element={<ExcursionInfo />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

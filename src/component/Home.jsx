// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import i18n from "../i18n"; // ✅ import your i18n setup
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Assets
import logo from "./../assets/logotip.svg";
import bgImage from "./../assets/bg1.jpg";
// import bgImage1 from "./../assets/hotel.svg";
import inst from "./../assets/img/instagram.png";
import tg from "./../assets/img/telegram.png";
import mail from "./../assets/img/gmail.png";
import phone from "./../assets/img/whatsapp.png";

export default function Home() {
  const { t } = useTranslation();

  // Navbar
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // API data
  const [banner, setBanner] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [excursions, setExcursions] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingExcursions, setLoadingExcursions] = useState(true);

  useEffect(() => {
    fetch("https://turist-1.onrender.com/api/banners")
      .then((res) => res.json())
      .then((data) => setBanner(data))
      .catch(console.error)
      .finally(() => setLoadingBanner(false));

    fetch("https://turist-1.onrender.com/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch(console.error)
      .finally(() => setLoadingHotels(false));

    fetch("https://turist-1.onrender.com/api/excursions")
      .then((res) => res.json())
      .then((data) => setExcursions(data))
      .catch(console.error)
      .finally(() => setLoadingExcursions(false));
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "0b1aa773-22d0-4433-b4d0-73b66610875f");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen font-sans"
    >
      {/* Navbar */}
      <header className="bg-white shadow-md px-4 py-3">
        <div className="flex justify-between container mx-auto items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h1 className="text-lg font-bold">Syýahat hyzmatlary</h1>
          </div>
          <nav className="hidden sm:flex gap-6 items-center">
            <NavLink
              className="bg-orange-400 text-white px-3 py-1 rounded font-semibold"
              to="/"
            >
              {t("home")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/hotels">
              {t("hotels")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">
              {t("excursions")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/attraction">
              {t("attractions")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/contact">
              {t("contacts")}
            </NavLink>
            <button className="bg-orange-400 text-white px-3 py-1 rounded">
              <a href="#contact">{t("tour")}</a>
            </button>
            <select
              value={language}
              onChange={changeLanguage}
              className="border rounded p-2"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col items-start gap-4 sm:hidden">
            <NavLink
              className="bg-orange-400 text-white px-3 py-1 rounded font-semibold"
              to="/"
            >
              {t("home")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/hotels">
              {t("hotels")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/excursion">
              {t("excursions")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/attraction">
              {t("attractions")}
            </NavLink>
            <NavLink className="text-lg font-bold" to="/contact">
              {t("contacts")}
            </NavLink>
            <button className="bg-orange-400 text-white px-3 py-1 rounded">
              <a href="#contact">{t("tour")}</a>
            </button>
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

      <div className="container mx-auto">
        {/* Search Bar */}
        {/* <section className="flex flex-row items-center pt-4 gap-2 justify-center px-4">
          <input
            type="text"
            placeholder={t("search")}
            className="border px-4 py-2 w-3/4 sm:w-1/2 rounded-md"
          />
          <button className="bg-orange-400 text-white px-6 py-2 rounded-md w-1/4 sm:w-auto">
            {t("searchBtn")}
          </button>
        </section> */}

        {/* Banner */}
        {loadingBanner ? (
          <p>{t("loading")}</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="rounded-md"
          >
            {banner.map((banners) => (
              <SwiperSlide key={banners.id}>
                <section className="text-center pt-6 px-4">
                  <div className="relative">
                    <img
                      src={`https://turist-1.onrender.com/static/uploads/${banners.image}`}
                      alt="banner"
                      className="w-full rounded-md"
                    />
                    <div className="absolute top-6 sm:top-10 left-4 sm:left-10 text-white text-left w-2/3 sm:w-auto">
                      <h2 className="text-lg sm:text-2xl font-bold">
                        {/* {t("bannerTitle")} */}
                      </h2>
                      <p className="text-sm sm:text-xl mt-2">
                        {t("bannerDesc")}
                      </p>
                      {/* <button className="mt-4 bg-green-500 px-4 py-2 rounded text-white">
                {t("bookNow")}
              </button> */}
                    </div>
                  </div>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Hotels */}
        <section className="mt-8 px-4">
          <h2 className="text-3xl font-bold my-6 text-center">{t("hotels")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loadingHotels ? (
              <p>{t("loading")}</p>
            ) : (
              hotels.slice(0, 6).map((hotel) => (
                <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
                  <div
                    key={hotel.id}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={`https://turist-1.onrender.com/static/uploads/${hotel.image}`}
                      alt={hotel.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-700/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow">
                      <p className="text-lg">{hotel.name_en}</p>
                      <p className="text-md font-semibold">{hotel.price} TMT</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-4">
            <Link
              to="/hotels"
              className="border-2 border-yellow-400 rounded-3xl p-2 font-medium"
            >
              {t("showMore")}
            </Link>
          </div>
        </section>

        {/* Excursions */}
        <section className="mt-10 px-4">
          <h2 className="text-2xl font-bold my-6 text-center">
            {t("excursion")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loadingExcursions ? (
              <p>{t("loading")}</p>
            ) : (
              excursions.slice(0, 6).map((excursion) => (
                <Link key={excursion.id} to={`/excursions/${excursion.id}`}>
                  <div
                    key={excursion.id}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={`https://turist-1.onrender.com/static/uploads/${excursion.image}`}
                      alt={excursion.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-700/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow">
                      <p className="text-lg">{excursion.name_en}</p>
                      <p className="text-md font-semibold">
                        {excursion.price} TMT
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-4">
            <Link
              to="/excursion"
              className="border-2 border-yellow-400 rounded-3xl p-2 font-medium"
            >
              {t("showMore")}
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-10 px-4 pb-10">
          <h2 className="text-xl font-bold mb-4 text-center my-6 ">
            {t("contact")}
          </h2>
          <div className="w-full border-2 border-blue-400 bg-white shadow-md rounded-md px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-9 text-sm">
                <div className="flex items-center space-x-2">
                  <img src={mail} alt="email" className="w-9 h-9" />
                  <Link to="mailto:syyahathyzmatlary@gmail.com">
                    syyahathyzmatlary@gmail.com
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={phone} alt="phone" className="w-9 h-9" />
                  <Link to="https://wa.me/99361007521">+99361007521</Link>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={tg} alt="telegram" className="w-9 h-9" />
                  <Link to="https://t.me/syyahat_hyzmatlary">t.me/syyahat_hyzmatlary</Link>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={inst} alt="instagram" className="w-10 h-10" />
                  <Link to="https://instagram.com/guncha409">@syyahathyzmatlary</Link>
                </div>
              </div>
              <form onSubmit={onSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="email"
                  placeholder="Почта"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <textarea
                  placeholder="Комментарий"
                  className="w-full border px-3 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows="4"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

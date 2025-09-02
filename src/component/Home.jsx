// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// Hooks
import useFetch from "../hooks/useFetch";

// Assets
import bgImage from "../assets/bg1.jpg";
import inst from "../assets/img/instagram.png";
import tg from "../assets/img/telegram.png";
import mail from "../assets/img/gmail.png";
import phone from "../assets/img/whatsapp.png";

export default function Home() {
  const { t } = useTranslation();

  const { data: banner, loading: loadingBanner } = useFetch(
    "https://turist.onrender.com/api/banners"
  );
  const { data: hotels, loading: loadingHotels } = useFetch(
    "https://turist.onrender.com/api/hotels"
  );
  const { data: excursions, loading: loadingExcursions } = useFetch(
    "https://turist.onrender.com/api/excursions"
  );

const onSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch("https://turist.onrender.com/api/contact", {
      method: "POST",
      body: formData, // No JSON.stringify, no headers
    });

    const res = await response.json();

    if (res.success) {
      alert("✅ Success!");
    } else {
      alert("❌ Error: " + (res.message || "Something went wrong"));
    }
  } catch (err) {
    console.error("Request failed:", err);
    alert("❌ Network error");
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
      <div className="container mx-auto">
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
            {banner.map((b) => (
              <SwiperSlide key={b.id}>
                <section className="text-center pt-6 px-4">
                  <div className="relative">
                    <img
                      src={`https://turist.onrender.com/static/uploads/${b.image}`}
                      alt="banner"
                      className="w-full rounded-md"
                    />
                    <div className="absolute top-6 sm:top-10 left-4 sm:left-10 text-white text-left w-2/3 sm:w-auto">
                      <p className="text-sm sm:text-xl mt-2">
                      </p>
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
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`https://turist.onrender.com/static/uploads/${hotel.image}`}
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
              excursions.slice(0, 6).map((exc) => (
                <Link key={exc.id} to={`/excursions/${exc.id}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`https://turist.onrender.com/static/uploads/${exc.image}`}
                      alt={exc.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-700/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow">
                      <p className="text-lg">{exc.name_en}</p>
                      <p className="text-md font-semibold">{exc.price} TMT</p>
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

        {/* Contact Form same as before... */}
        <section id="contact" className="mt-10 px-4 pb-10">
         
          <h2 className="text-xl font-bold mb-4 text-center my-6 ">
      
            {t("contact")}
          </h2>
          <div className="w-full border-2 border-blue-400 bg-white shadow-md rounded-md px-12 py-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-9 text-sm">
                
                <div className="flex items-center space-x-2">
                  
                  <img src={mail} alt="email" className="w-9 h-9" />{" "}
                  <Link to="mailto:syyahathyzmatlary@gmail.com">
                    
                    syyahathyzmatlary@gmail.com{" "}
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  
                  <img src={phone} alt="phone" className="w-9 h-9" />{" "}
                  <Link to="https://wa.me/99361007521">+99361007521</Link>{" "}
                </div>
                <div className="flex items-center space-x-2">
                  
                  <img src={tg} alt="telegram" className="w-9 h-9" />{" "}
                  <Link to="https://t.me/syyahat_hyzmatlary">
                    t.me/syyahat_hyzmatlary
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  
                  <img src={inst} alt="instagram" className="w-10 h-10" />{" "}
                  <Link to="https://instagram.com/guncha409">
                    @syyahathyzmatlary
                  </Link>
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

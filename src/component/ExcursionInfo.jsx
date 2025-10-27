import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import i18n from "../i18n"; // ✅ import your i18n setup
import { useTranslation } from "react-i18next";
import bgImage from "./../assets/bg1.jpg";

export default function ExcursionInfo() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const { t } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    fetch(`https://turist-1.onrender.com/excursions/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data))
      .catch((err) => console.error("Error loading hotel:", err));
  }, [id]);

  if (!hotel) return <p className="text-center">{t("loading")}</p>;

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
      <main className="max-w-3xl mx-auto p-6 bg-white/95 backdrop-blur rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-1">{name}</h1>
        <p className="text-gray-500 text-sm mb-4">{cityName}</p>

        <img
          src={`https://turist-1.onrender.com/static/uploads/${hotel.image}`}
          alt={name}
          className="w-full h-72 object-cover rounded-md mb-4"
        />

        <div className="flex items-center justify-between text-sm text-gray-700 border-t border-b py-2 mb-4">
          <span>
            {t("price")}: <strong>{t("callus")}</strong>
          </span>
        </div>

        <p className="leading-relaxed text-gray-700 text-base">{description}</p>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useContacts from "../hooks/contact";

// Components

// Assets
import bgImage from "./../assets/bg1.jpg";
import bgImage1 from "./../assets/img/1.png";
import man from "./../assets/img/person.png";
import inst from "./../assets/img/instagram.png";
import tg from "./../assets/img/telegram.png";
import mail from "./../assets/img/gmail.png";
import phone from "./../assets/img/whatsapp.png";

export default function Contact() {
  const { t } = useTranslation();
  const { loading } = useContacts();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4 rounded-lg mt-6 sm:mt-1">
            <div className="space-y-8 text-sm mx-10 sm:mx-20">
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
                <Link to="https://t.me/syyahat_hyzmatlary">
                  t.me/syyahat_hyzmatlary
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <img src={inst} alt="instagram" className="w-10 h-10" />
                <Link to="https://instagram.com/guncha409">
                  syyahathyzmatlary
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={man}
                alt="Support Illustration"
                className="w-96 h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

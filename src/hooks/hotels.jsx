import { useState, useEffect } from "react";
import i18n from "../i18n";

export function useHotels() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    fetch("https://turist.onrender.com/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Fetch all hotels error:", err));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(`https://turist.onrender.com/api/hotels?query=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Hotel search error:", err);
            setLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Фильтры и сортировки
  let displayedHotels = query.trim() === "" ? hotels : searchResults;

  if (cityFilter) {
    displayedHotels = displayedHotels.filter(
      (hotel) => String(hotel.city.id) === cityFilter
    );
  }

  if (priceSort) {
    displayedHotels = [...displayedHotels].sort((a, b) =>
      priceSort === "low-high" ? a.price - b.price : b.price - a.price
    );
  }

  if (ratingSort) {
    displayedHotels = [...displayedHotels].sort((a, b) =>
      ratingSort === "high-low" ? b.rating - a.rating : a.rating - b.rating
    );
  }

  const cities = [...new Map(hotels.map((hotel) => [hotel.city.id, hotel.city])).values()];

  return {
    menuOpen,
    toggleMenu,
    language,
    changeLanguage,
    hotels,
    searchResults,
    query,
    setQuery,
    loading,
    cityFilter,
    setCityFilter,
    priceSort,
    setPriceSort,
    ratingSort,
    setRatingSort,
    displayedHotels,
    cities,
  };
}

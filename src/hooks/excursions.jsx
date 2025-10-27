import { useState, useEffect } from "react";
import i18n from "../i18n";

export function useExcursions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const [excursions, setExcursions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const changeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Fetch excursions
  useEffect(() => {
    fetch("https://turist-1.onrender.com/api/excursions")
      .then((res) => res.json())
      .then((data) => setExcursions(data))
      .catch((err) => console.error("Fetch excursions error:", err));
  }, []);

  // Search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(
          `https://turist-1.onrender.com/api/excursions?query=${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Excursion search error:", err);
            setLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Filters and sort
  let displayedExcursions = query.trim() === "" ? excursions : searchResults;

  if (cityFilter) {
    displayedExcursions = displayedExcursions.filter(
      (exc) => String(exc.city.id) === cityFilter
    );
  }

  if (priceSort) {
    displayedExcursions = [...displayedExcursions].sort((a, b) =>
      priceSort === "low-high" ? a.price - b.price : b.price - a.price
    );
  }

  const cities = [...new Map(excursions.map((e) => [e.city.id, e.city])).values()];

  return {
    menuOpen,
    toggleMenu,
    language,
    changeLanguage,
    query,
    setQuery,
    displayedExcursions,
    loading,
    cities,
    cityFilter,
    setCityFilter,
    priceSort,
    setPriceSort,
  };
}

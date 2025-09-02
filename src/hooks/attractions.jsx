import { useState, useEffect } from "react";

export function useAttractions() {
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetch("https://turist.onrender.com/api/attractions")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Fetch attractions error:", err));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(`https://turist.onrender.com/api/attractions?query=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  let displayedHotels = query.trim() === "" ? hotels : searchResults;
  if (cityFilter) displayedHotels = displayedHotels.filter(h => String(h.city.id) === cityFilter);
  if (typeFilter) displayedHotels = displayedHotels.filter(h => h.type && h.type.toLowerCase() === typeFilter);

  const cities = [...new Map(hotels.map(h => [h.city.id, h.city])).values()];

  return {
    hotels,
    displayedHotels,
    searchResults,
    query,
    setQuery,
    loading,
    cityFilter,
    setCityFilter,
    typeFilter,
    setTypeFilter,
    cities
  };
}

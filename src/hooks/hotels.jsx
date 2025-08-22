// src/hooks/hotels.js
import { useState, useEffect } from "react";

export default function useHotels({ query, city, priceSort, ratingSort, debounceMs = 400 }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);

      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (city) params.append("city", city);
      if (priceSort) params.append("priceSort", priceSort);
      if (ratingSort) params.append("ratingSort", ratingSort);

      try {
        const res = await fetch(`http://127.0.0.1:5000/api/hotels?${params.toString()}`, {
          signal: controller.signal
        });
        const data = await res.json();
        setHotels(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, city, priceSort, ratingSort, debounceMs]);

  return { hotels, loading };
}

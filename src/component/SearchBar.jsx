import { useState, useEffect, useCallback } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Function to fetch results, wrapped in useCallback to prevent recreation on every render
  const fetchResults = useCallback(async (searchTerm) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/excursions/?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults([]);
    }
  }, []);

  // Debounce search on typing
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, fetchResults]);

  // Immediate search on button click
  const handleSearch = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    fetchResults(query);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <section className="flex flex-row items-center pt-4 gap-2 justify-center px-4 w-full sm:w-3/4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск"
          className="border px-4 py-2 w-3/4 sm:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Search hotels"
        />
        <button
          onClick={handleSearch}
          disabled={query.trim() === ""}
          className={`bg-orange-400 text-white px-6 py-2 rounded-md w-1/4 sm:w-auto transition ${
            query.trim() === "" ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-500"
          }`}
          aria-disabled={query.trim() === ""}
        >
          Искать
        </button>
      </section>

      {results.length > 0 && (
        <div className="bg-white border border-gray-300 mt-2 w-3/4 sm:w-1/2 rounded-md shadow-md overflow-hidden" role="listbox">
          {results.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => console.log("Clicked:", item)}
              role="option"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  console.log("Clicked:", item);
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

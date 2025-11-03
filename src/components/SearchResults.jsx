import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { API_URL } from "../config";

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${API_URL}&s=${query}`);
        const data = await res.json();
        if (data.Response === "True") setResults(data.Search);
        else setResults([]);
      } catch {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  if (!results || results.length === 0) return <p className="text-white">No results found.</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Search Results for "{query}"</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {results.map((item) => (
          <MovieCard key={item.imdbID} item={item} />
        ))}
      </div>
    </section>
  );
}

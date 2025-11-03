import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const famousSeries = [
  "Breaking Bad", "Game of Thrones", "Stranger Things", "The Office",
  "The Witcher", "The Mandalorian", "Sherlock", "Friends",
  "Better Call Saul", "Peaky Blinders"
];

export default function TopSeries() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("topSeries"));
    if (cached) {
      setSeries(cached);
      setLoading(false);
    }

    const fetchSeries = async () => {
      try {
        const promises = famousSeries.map(title =>
          fetch(`${API_URL}&t=${encodeURIComponent(title)}`).then(res => res.json())
        );
        const results = await Promise.all(promises);
        const valid = results.filter(s => s.Response === "True");
        setSeries(valid);
        setLoading(false);
        localStorage.setItem("topSeries", JSON.stringify(valid));
      } catch (err) {
        console.error("Failed to fetch top series", err);
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-white">Top Series</h2>

      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array(10).fill(0).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800 h-64 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {series.map((item) => (
            <MovieCard key={item.imdbID} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

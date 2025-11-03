import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const famousMovies = [
  "Inception", "Avatar", "Interstellar", "The Dark Knight", "Gladiator",
  "Titanic", "Avengers: Endgame", "Joker", "Forrest Gump", "The Matrix"
];

export default function TopMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("topMovies"));
    if (cached) {
      setMovies(cached);
      setLoading(false); // instantly show cache
    }

    const fetchMovies = async () => {
      try {
        const promises = famousMovies.map(title =>
          fetch(`${API_URL}&t=${encodeURIComponent(title)}`).then(res => res.json())
        );
        const results = await Promise.all(promises);
        const valid = results.filter(m => m.Response === "True");
        setMovies(valid);
        setLoading(false);
        localStorage.setItem("topMovies", JSON.stringify(valid)); // refresh cache
      } catch (err) {
        console.error("Failed to fetch top movies", err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Top Movies</h2>

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
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} item={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

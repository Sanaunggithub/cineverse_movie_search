import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search/${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <FontAwesomeIcon icon={faFilm} className="text-blue-500" />
        <span>CineVerse</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition"
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </Link>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 rounded-lg text-black bg-white"
          />

          <button
            type="submit"
            className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

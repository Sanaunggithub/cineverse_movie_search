import { useNavigate } from "react-router-dom";

export default function MovieCard({ item }) {
  const navigate = useNavigate();
  console.log("Navigating to:", `/movie/${item.imdbID}`);

  return (
    <div
      onClick={() => navigate(`/movie/${item.imdbID}`)}
      className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
    >
      <img
        src={item.Poster !== "N/A" ? item.Poster : "/placeholder.png"}
        alt={item.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white">{item.Title}</h3>
        <p className="text-gray-400 text-sm">{item.Year}</p>
      </div>
    </div>
  );
}

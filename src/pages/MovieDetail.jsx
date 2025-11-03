import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${API_URL}&i=${id}&plot=full`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 h-96 object-cover rounded-lg shadow-lg"
        />
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-400 mb-4">{movie.Year}</p>
          
          <div className="space-y-3">
            <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
            <p><span className="font-semibold">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold">Cast:</span> {movie.Actors}</p>
            <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
            <p><span className="font-semibold">Rating:</span> {movie.imdbRating}/10</p>
            <p><span className="font-semibold">Language:</span> {movie.Language}</p>
            <p><span className="font-semibold">Country:</span> {movie.Country}</p>
            <p className="mt-4"><span className="font-semibold">Plot:</span> {movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
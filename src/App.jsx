import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetail";

function App() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (!query.trim()) return;
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import RadioGroup from "./components/radio";
import Loading from "./components/loading";
import { motion } from "framer-motion";
import Card from "./components/card";
import './index.css'
import ToTop from "./components/toTop";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);

  const fetchCharacters = async (currentPage, query = "") => {
    if (loading) return;
    setLoading(true);
    try {

      const filterApi = filter !== 'all' ? `&status=${filter}` : "";

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${query}${filterApi}`
      );
      const data = await response.json();

      if (!data.error) {
        setInfo(data.info);
        setCharacters((prevCharacters) => {
          const newCharacters = [...prevCharacters, ...data.results];
          const uniqueCharacters = newCharacters.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          if (currentPage === 1) return uniqueCharacters;
          return uniqueCharacters;
        });
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1 && characters.length === 0) {
      fetchCharacters(page, search);
    }
  }, [page, search, characters.length]);

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    fetchCharacters(1, search);
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setCharacters([]);
    fetchCharacters(1, search);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && info.count !== characters.length) {
        fetchCharacters(page, search);
      }
    }
    setIsVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, search]);

  return (
    <div className="min-h-screen w-full text-white relative px-14 pt-6 pb-14 bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900 animated-gradient">
      <img
        src="image/logo.png"
        alt="portal"
        className="mx-auto w-72 mb-6"
      />

      <form
        className="flex justify-center items-center"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search for a character..."
          className="px-4 py-2 rounded-l-lg focus:outline-none text-emerald-400 w-40 md:w-56 lg:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="submit"
          className="bg-emerald-500 px-4 py-2 rounded-r-lg hover:bg-emerald-700 text-white font-semibold"
        >
          Search
        </button>
      </form>

      <RadioGroup setFilter={setFilter} className="flex justify-center items-center gap-6 mt-2" />

      <p className="text-center my-4">Results: {!loading && info.count ? info.count : 0}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <motion.div
            className="backdrop-blur-sm rounded-xl shadow-black/50 shadow-xl hover:shadow-emerald-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={`characters-${index}`}
          >
            <Card character={character} />
          </motion.div>
        ))}
      </div>

      {isVisible && (
        <ToTop isVisible={isVisible} />
      )}

      {loading && <Loading />}
    </div>
  );
};

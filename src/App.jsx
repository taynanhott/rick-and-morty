
import './index.css'
import Card from "./components/card";
import ToTop from "./components/toTop";
import { motion } from "framer-motion";
import Search from "./components/search";
import Loading from "./components/loading";
import RadioGroup from "./components/radio";
import React, { useState, useEffect } from "react";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  // --------------------------------------------------------------------------------------------------

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, search]);

  // --------------------------------------------------------------------------------------------------

  const fetchCharacters = async (currentPage, query = "") => {
    if (loading) return;
    setLoading(true);
    setCount(0);
    try {

      const filterApi = filter !== 'all' ? `&status=${filter}` : "";

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${query}${filterApi}`
      );
      const data = await response.json();

      if (!data.error) {
        setCount(data.info.count);
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

  // --------------------------------------------------------------------------------------------------

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setCharacters([]);
    fetchCharacters(1, search);
  };

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

  return (
    <div className="min-h-screen w-full text-white relative px-14 pt-6 pb-14 bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900 animated-gradient">
      <img
        src="image/logo.png"
        alt="portal"
        className="mx-auto w-72 mb-6"
      />

      <Search handleSearch={handleSearch} setSearch={setSearch} search={search} />

      <RadioGroup setFilter={setFilter} className="flex justify-center items-center gap-6 mt-2" />

      <p className="text-center my-4">Results: {!loading ? count : 0}</p>

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

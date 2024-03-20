import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Templates/Header";
import Footer from "./Components/Templates/Footer";

import Home from "./Components/Home";
import Movies from "./Components/Movies/Movie";
import Ratings from "./Components/Ratings/Rating";
import Actors from "./Components/Actors/Actor";

function App() {
  const data = useSelector((state) => state.movie.data);
  const [movies, setMovies] = useState(data);

  const searchMovie = (value) => {
    const filteredMovies = movies.filter((movie) => {
      return movie.title.includes(value);
    });

    setMovies(filteredMovies);
  };

  return (
    <Router>
      {/* Wrap Header and Footer with a Layout component for better organization */}
      <Layout>
        <Header searchMovie={searchMovie} />
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

function Layout({ children }) {
  return <div className="app-layout">{children}</div>;
}

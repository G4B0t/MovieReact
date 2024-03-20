import React, { useState } from "react";
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import "./header.css";
import logo from "./img/movie.png";


const Header = ({ searchMovie }) => {
  const [query, setQuery] = useState("");

  const onChangeQuery = () => {
    searchMovie(query);
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className=" align-self-lg-stretch"
        >
          <div className="menu">
            <ul>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/ratings">Ratings</Link>
              </li>
              <li>
                <Link to="/actors">Actors</Link>
              </li>
            </ul>
          </div>

          <form className="search" onSubmit={onChangeQuery}>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

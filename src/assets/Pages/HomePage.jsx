import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home">

<p className="home-title">
  <h2>Pokedex</h2>
 
  <h6>Thx <a href="https://pokeapi.co/">PokéAPI</a> pour les données</h6>
</p>  

      <p className="home-links">
        <Link to="/pokemons">Voir tous les pokémons</Link>
        <br />
               <br />
                      <br />
                 

        <Link to="/types">Voir tous les types</Link>
      </p>
    </section>
  );
}

export default HomePage;

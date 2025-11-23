import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/NavBar.jsx";
import HomePage from "./assets/Pages/HomePage.jsx";
import PokemonListPage from "./assets/Pages/PokemonListPage.jsx";
import PokemonDetailPage from "./assets/Pages/PokemonDetailPage.jsx";
import TypeListPage from "./assets/Pages/TypeListPage.jsx";
import TypeDetailPage from "./assets/Pages/TypeDetailPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemons" element={<PokemonListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/types" element={<TypeListPage />} />
          <Route path="/types/:typeName" element={<TypeDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

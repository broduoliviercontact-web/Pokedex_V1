import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchPokemonList,
  getPokemonIdFromUrl,
  spriteUrlFromId,
} from "../../api";
import "./PokemonListPage.css";

function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 20;

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchPokemonList(page, limit)
      .then((data) => {
        setPokemons(data.results);
        setCount(data.count);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const maxPage = Math.ceil(count / limit) || 1;

  if (loading) return <p>Chargement des pokémons...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section>
      <h1 className="page-title">Liste des pokémons</h1>

      <div className="pokemon-grid">
        {pokemons.map((p) => {
          const id = getPokemonIdFromUrl(p.url);
          const imgUrl = spriteUrlFromId(id);

          return (
            <Link key={p.name} to={`/pokemon/${p.name}`}>
              <article className="pokemon-card">
                <img src={imgUrl} alt={p.name} className="pokemon-card-img" />
                <p className="pokemon-card-name">{p.name}</p>
                <small className="pokemon-card-id">#{id}</small>
b              </article>
            </Link>
          );
        })}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Précédent
        </button>
        <span className="pagination-info">
          Page {page} / {maxPage}
        </span>
        <button
          className="pagination-btn"
          disabled={page === maxPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Suivant
        </button>
      </div>
    </section>
  );
}

export default PokemonListPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPokemon, spriteUrlFromId } from "../../api";
import "./PokemonDetailPage.css";

function PokemonDetailPage() {
  const { name } = useParams(); // nom du pokémon dans l'URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchPokemon(name)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p>Chargement du pokémon...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!pokemon) return null;

  const sprite =
    pokemon.sprites?.front_default || spriteUrlFromId(pokemon.id);

  return (
    <section>
      <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>
      <div className="pokemon-detail-body">
        <img
          src={sprite}
          alt={pokemon.name}
          className="pokemon-detail-img"
        />

        <div>
          <p>
            <strong>ID :</strong> #{pokemon.id}
          </p>

          <p>
            <strong>Types :</strong>{" "}
            {pokemon.types
              .map((t) => (
                <Link
                  key={t.type.name}
                  to={`/types/${t.type.name}`}
                  style={{ textTransform: "capitalize", marginRight: "0.5rem" }}
                >
                  {t.type.name}
                </Link>
              ))
              .reduce((prev, curr) => [prev, " ", curr])}
          </p>

          <p>
            <strong>Taille :</strong> {pokemon.height}
          </p>
          <p>
            <strong>Poids :</strong> {pokemon.weight}
          </p>

          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/pokemons">← Retour à la liste</Link>
      </p>
    </section>
  );
}

export default PokemonDetailPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchTypeDetail,
  getPokemonIdFromUrl,
  spriteUrlFromId,
} from "../../api";

function TypeDetailPage() {
  const { typeName } = useParams();
  const [typeData, setTypeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchTypeDetail(typeName)
      .then((data) => setTypeData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [typeName]);

  if (loading) return <p>Chargement du type...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!typeData) return null;

  // Liste des pokémons associés à ce type
  const pokemons = typeData.pokemon || [];

  return (
    <section>
      <h1 style={{ textTransform: "capitalize" }}>Type : {typeName}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "1rem",
        }}
      >
        {pokemons.map((p) => {
          const name = p.pokemon.name;
          const id = getPokemonIdFromUrl(p.pokemon.url);
          const imgUrl = spriteUrlFromId(id);

          return (
            <Link key={name} to={`/pokemon/${name}`}>
              <article
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0.5rem",
                  textAlign: "center",
                }}
              >
                <img src={imgUrl} alt={name} />
                <p style={{ textTransform: "capitalize" }}>{name}</p>
                <small>#{id}</small>
              </article>
            </Link>
          );
        })}
      </div>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/types">← Retour aux types</Link>
      </p>
    </section>
  );
}

export default TypeDetailPage;

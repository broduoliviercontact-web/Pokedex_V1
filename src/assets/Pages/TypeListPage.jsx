import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTypes } from "../../api";
import "./TypeListPage.css";

function TypeListPage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchTypes()
      .then((data) => setTypes(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des types...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section className="type-list">
      <h1>Types de pokémons</h1>

      <div className="type-chips">
        {types.map((t) => (
          <Link key={t.name} to={`/types/${t.name}`}>
            <button className="type-chip">
              {t.name}
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TypeListPage;

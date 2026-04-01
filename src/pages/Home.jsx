import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCharacters(page)
      .then((data) => {
        if (!cancelled) {
          setCharacters(data.results);
          setInfo(data.info);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page, retry]);

  if (loading) return <p>Chargement…</p>;

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p className="error">Une erreur est survenue : {error}</p>
        <button onClick={() => setRetry(retry + 1)} style={{ marginTop: "10px", padding: "8px 16px", background: "#0f3460", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <Grid characters={characters} />
      <Pagination info={info} page={page} setPage={setPage} />
    </div>
  );
}

export default Home;

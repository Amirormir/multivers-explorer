import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacterById } from "../services/api";
import EvaluationForm from "../components/EvaluationForm";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchCharacterById(id)
      .then((data) => {
        setCharacter(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="error">Une erreur est survenue : {error}</p>;

  return (
    <div className="detail">
      <div className="detail-card">
        <img src={character.image} alt={character.name} />
        <div className="detail-info">
          <h2>{character.name}</h2>
          <p><strong>Statut :</strong> {character.status}</p>
          <p><strong>Espèce :</strong> {character.species}</p>
          <p><strong>Origine :</strong> {character.origin.name}</p>
        </div>
      </div>

      <EvaluationForm />
    </div>
  );
}

export default CharacterDetail;

import { Link } from "react-router-dom";

function Card({ character }) {
  return (
    <Link to={`/character/${character.id}`} className="card">
      <img src={character.image} alt={character.name} />
      <div className="card-info">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
      </div>
    </Link>
  );
}

export default Card;

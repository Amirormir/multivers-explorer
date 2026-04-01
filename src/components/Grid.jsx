import Card from "./Card";

function Grid({ characters }) {
  return (
    <div className="grid">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}

export default Grid;

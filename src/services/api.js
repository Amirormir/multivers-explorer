const BASE_URL = "/api";

export async function fetchCharacters(page = 1) {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des personnages");
  }
  return response.json();
}

export async function fetchCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement du personnage");
  }
  return response.json();
}

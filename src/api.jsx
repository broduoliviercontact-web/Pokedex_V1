const API_BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des pokémons");
  return res.json();
}

export async function fetchPokemon(name) {
  const res = await fetch(`${API_BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error("Pokémon introuvable");
  return res.json();
}

export async function fetchTypes() {
  const res = await fetch(`${API_BASE}/type`);
  if (!res.ok) throw new Error("Erreur lors du chargement des types");
  return res.json();
}

export async function fetchTypeDetail(typeName) {
  const res = await fetch(`${API_BASE}/type/${typeName}`);
  if (!res.ok) throw new Error("Type introuvable");
  return res.json();
}

// Récupérer l'id d'un pokémon à partir de son URL
export function getPokemonIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

// URL de sprite de secours
export function spriteUrlFromId(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

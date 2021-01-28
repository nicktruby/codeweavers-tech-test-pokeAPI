export interface PokemonResult {
  name: string
  url: string
}

export interface GroupPokemonResponse {
  count: number,
  next: string,
  previous: string,
  results: PokemonResult[]
}

export interface IndividualPokemonResponse {
  abilities: object[],
  base_experience: number,
  forms: object[],
  game_indices: object[],
  height: number,
  held_items: [],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: object[],
  name: string,
  order: number,
  species: object,
  sprites: object[],
  stats: object[],
  types: object[],
  weight: number
}

export const BackgroundColours = {
  "normal" : "bg-grey",
  "fighting" : "bg-green",
  "flying" : "bg-brown",
  "poison" : "bg-purple",
  "ground" : "bg-brown",
  "rock" : "bg-brown",
  "bug" : "bg-darkgreen",
  "ghost" : "bg-black",
  "steel" : "bg-darkgrey",
  "fire" : "bg-red",
  "water" : "bg-blue",
  "grass" : "bg-green",
  "electric" : "bg-yellow",
  "psychic" : "bg-purple",
  "ice" : "bg-blue",
  "dragon" : "bg-red",
  "dark" : "bg-black",
  "fairy" : "bg-pink",
  "unknown" : "bg-grey",
  "shadow" : "bg-black",
}

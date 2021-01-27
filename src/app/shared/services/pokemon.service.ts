const PAGE_SIZE = 50;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface pokemonResult {
  name: string
  url: string
}

interface groupPokemonResponse {
  count: number,
  next: string,
  previous: string,
  results: pokemonResult[]
}

interface individualPokemonResponse {
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

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor( private http: HttpClient ) { }

  async getIndividualPokemon(url) : Promise<individualPokemonResponse> {
    return await this.http.get<individualPokemonResponse>(url).toPromise();
  }

  async getPageOfPokemon(pageNumber) : Promise<individualPokemonResponse[]> {
    
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`
    const allPokemon = await this.http.get<groupPokemonResponse>(url).toPromise();
    return await Promise.all(allPokemon.results.map(eachPokemon => this.getIndividualPokemon(eachPokemon.url)));
  };

}

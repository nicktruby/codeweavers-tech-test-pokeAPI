const PAGE_SIZE = 50;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupPokemonResponse, IndividualPokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor( private http: HttpClient ) { }

  async getIndividualPokemon(nameOrID) : Promise<IndividualPokemonResponse> {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrID}`
    return await this.http.get<IndividualPokemonResponse>(url).toPromise();
  }

  async getPageOfPokemon(pageNumber) : Promise<IndividualPokemonResponse[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`
    const allPokemon = await this.http.get<GroupPokemonResponse>(url).toPromise();
    return await Promise.all(allPokemon.results.map(eachPokemon => this.getIndividualPokemon(eachPokemon.name)));
  };
  
  cleanPokemon(pokemon) {
    return { 
      name : pokemon.name ? pokemon.name : "",
      id : pokemon.id ? this.formatPokemonID(pokemon.id) : "",
      image : pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : "",
      types : pokemon.types ? pokemon.types.map(type => type.type.name) : "",
    }
  }
  
  formatPokemonID (id) : string {
    if (id < 10 ) {
      return `#000${id}`
    }
    else if (id < 100 ) {
      return `#00${id}`
    }
    else if (id < 1000 ) {
      return `#0${id}`
    }
    else {
      return `#${id}`
    }
  }

}

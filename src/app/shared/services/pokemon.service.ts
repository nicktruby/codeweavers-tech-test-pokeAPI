const PAGE_SIZE = 50;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GroupPokemonResponse, IndividualPokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor( private http: HttpClient ) { }

  
  getPageOfPokemon(filter, pageNumber) : Observable<GroupPokemonResponse> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`
    return this.http.get<GroupPokemonResponse>(url)
  }
  
  getIndividualPokemon(nameOrID) : Observable<IndividualPokemonResponse> {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrID}`
      return this.http.get<IndividualPokemonResponse>(url);
  }
  
  // async getPageOfPokemon(filter, pageNumber) : Promise<IndividualPokemonResponse[]> {
    //   const url = `https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`
  //   const allPokemon = await this.http.get<GroupPokemonResponse>(url).toPromise();
  //   return await Promise.all(allPokemon.results.map(eachPokemon => this.getIndividualPokemon(eachPokemon.name)));
  // };
  
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

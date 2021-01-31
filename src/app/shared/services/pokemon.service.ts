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
    const url = `https://pokeapi.co/api/v2/${filter}/?limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`
    return this.http.get<GroupPokemonResponse>(url)
  }
  
  getIndividualPokemon(nameOrID) : Observable<IndividualPokemonResponse> {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrID}`
      return this.http.get<IndividualPokemonResponse>(url);
  }
  
  getSpeciesData(url) : any {
    return this.http.get(url);
  }
  
  buildBasicPokemon(pokemonData) {
    return { 
      name : pokemonData.name ? pokemonData.name : "",
      id : pokemonData.id ? this.formatPokemonID(pokemonData.id) : "",
      image : this.getImage(pokemonData),
      types : pokemonData.types ? pokemonData.types.map(type => type.type.name) : "",
    }
    
  }
  
  buildFullPokemon(pokemon, species: any = {}) {
    console.log(pokemon.moves[0]);
    
    return { 
      name : pokemon.name ? pokemon.name : "",
      id : pokemon.id ? this.formatPokemonID(pokemon.id) : "",
      image : pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default ? pokemon.sprites.front_default : pokemon.sprites.other['official-artwork'].front_default,
      types : pokemon.types ? pokemon.types.map(type => type.type.name) : "",
      stats: pokemon.stats.map(stat => ({ name : stat.stat.name, baseValue : stat.base_stat,})),
      description : this.getDescription(species),
      height : (pokemon.height * 0.175).toFixed(2),
      weight : (pokemon.weight * 0.115).toFixed(2),
      happiness : species.base_happiness,
      shape : species.shape.name,
      habitat : species.habitat.name,
      eggGroup : species.egg_groups[0].name,
      zone : species.habitat.name,
      moves: pokemon.moves
      
    }
  }
  
  getDescription(speciesData : any = {}) {
    const englishdescriptions =
    // filter out any duplicates
      [...new Set(speciesData.flavor_text_entries
        //filter to english language only
              .filter(entry => entry.language.name === "en")
              // use only the text itself
              .map(entry => entry.flavor_text)
      )]
    return englishdescriptions[5] ? englishdescriptions[5] :
          englishdescriptions[0] ? englishdescriptions[0] : 
          ""
  }

  getImage(pokemonData: IndividualPokemonResponse) {
    return pokemonData.sprites.other.dream_world.front_default ? pokemonData.sprites.other.dream_world.front_default :
          pokemonData.sprites.front_default ? pokemonData.sprites.front_default :
          pokemonData.sprites.other['official-artwork'].front_default ? pokemonData.sprites.other['official-artwork'].front_default : ""
  }

  formatPokemonID (id) : string {
    if (id < 10 ) return `#000${id}`;
    else if (id < 100 ) return `#00${id}`;
    else if (id < 1000 ) return `#0${id}`
    else return `#${id}`
  }

}

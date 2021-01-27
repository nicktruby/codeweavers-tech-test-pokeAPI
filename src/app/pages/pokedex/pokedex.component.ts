import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonArr : any[];

  constructor(private pokemonSvc : PokemonService) { }

  ngOnInit(): void {
    this.pokemonSvc.getPageOfPokemon(1)
    .then(allPokemon => this.pokemonArr = allPokemon);
  }
}
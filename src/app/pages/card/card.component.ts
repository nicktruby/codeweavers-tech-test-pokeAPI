import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  pokemonArr : object[];

  constructor(private http: HttpClient, private pokemonSvc : PokemonService) { }

  ngOnInit(): void {
    this.pokemonSvc.getPageOfPokemon(1)
    .then(allPokemon => this.pokemonArr = allPokemon);
  }

}

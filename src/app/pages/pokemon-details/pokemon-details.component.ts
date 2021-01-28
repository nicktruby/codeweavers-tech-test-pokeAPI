import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { IndividualPokemonResponse } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit {

  pokemon: any = {};

  constructor(
    private route: ActivatedRoute,
    private pokemonSvc: PokemonService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    const id = this.route.snapshot.paramMap.get('id')
    await this.pokemonSvc.getIndividualPokemon(id)
      .then(pokemon => this.pokemon = pokemon)
  }
}

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

  pokemon: any = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonSvc: PokemonService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.pokemonSvc.getIndividualPokemon(id)
      .subscribe(individualPokemon => this.pokemon = individualPokemon);


    // this.pokemonSvc.getIndividualPokemon(id)
    //   .subscribe(indivudalPokemon => {
    //     this.pokemon = indivudalPokemon
    //     console.log('abc')
    //     console.log(this.pokemon)
    //   })
  }
}

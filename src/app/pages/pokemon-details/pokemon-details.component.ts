import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { IndividualPokemonResponse, BackgroundColours } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})

export class PokemonDetailsComponent implements OnInit {

  pokemon: any = [];
  backgroundClass: string = "bg-green";
  activeDetails : string = "about";
  detailsPosition : string = "position1";


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
      .subscribe(individualPokemon => {
        this.pokemon = this.pokemonSvc.cleanPokemon(individualPokemon)
        this.backgroundClass = BackgroundColours[this.pokemon.types[0]]
        console.log(individualPokemon);
      });
  }

  setActiveDetails(itemName): void {
    this.activeDetails = itemName
    switch (itemName) {
      case "about": this.detailsPosition = "position1"; break;
      case "stats": this.detailsPosition = "position2"; break;
      case "evolution": this.detailsPosition = "position3"; break;
      case "moves": this.detailsPosition = "position4"; break;
    }    
  }
}

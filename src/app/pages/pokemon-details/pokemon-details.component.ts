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
  pokemonData: any;
  speciesData: any;
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
    //step 1, get the ID for the pokemon out of the URL
    const id = this.route.snapshot.paramMap.get('id')

    //step 2, get the data from the 'pokemon' endpoint
    this.pokemonSvc.getIndividualPokemon(id)
      .subscribe(pokemonDataResponse => {
        this.pokemonData = pokemonDataResponse
        
        //step 3 - get the data from the 'species' endpoint
        this.pokemonSvc.getSpeciesData(pokemonDataResponse.species.url)
        .subscribe(speciesDataResponse => {
          this.speciesData = speciesDataResponse

          //step 4 - run both data sets into the function to get a single clean pokemon data object
          this.pokemon = this.pokemonSvc.buildFullPokemon(this.pokemonData, this.speciesData)
          this.backgroundClass = BackgroundColours[this.pokemon.types[0]]
          })
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

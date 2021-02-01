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
  
  evolutionStepsArr = Array;
  numberOfEvolutionSteps : number = 1;
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
        
        //step 3 - get the data from the 'species' endpoint
        this.pokemonSvc.getEndpointData(pokemonDataResponse.species.url)
        .subscribe(speciesDataResponse => {

          //step 4 - get the data from the 'evolution chain' endpoint
          this.pokemonSvc.getEndpointData(speciesDataResponse.evolution_chain.url)
          .subscribe(EvolutionDataResponse => {

          //step 5 - run the data sets into the builder function to get a pokemon data object
          this.pokemon = this.pokemonSvc.buildFullPokemon(pokemonDataResponse, speciesDataResponse, EvolutionDataResponse)
          this.backgroundClass = BackgroundColours[this.pokemon.types[0]]
          this.numberOfEvolutionSteps = this.pokemon.evolution.length
          //step 6 - iterate through the evolution stages, and fetch their images
          
          if(this.pokemon.evolution) {
            this.pokemon.evolution.forEach((eachStage, index) => {
            this.pokemonSvc.getIndividualPokemon(eachStage.name)
            .subscribe(res => this.pokemon.evolution[index].image = this.pokemonSvc.getImage(res))
            });
          }
        })
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

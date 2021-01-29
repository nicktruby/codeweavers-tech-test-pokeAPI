import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { GroupPokemonResponse } from 'src/app/shared/models/pokemon.model';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonResultsArr: any;
  pokemonArr : any[] = [];

  currentPage : number = 1;
  maxPage : number;
  pageSize : number = 50;
  collectionSize : number = 50;
  pokemonFilter : string = 'pokemon';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonSvc: PokemonService,
    private location: Location,
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
  }

  ngOnInit(): void {
    this.pokemonFilter = this.route.snapshot.paramMap.get('filter')
    this.currentPage = Number(this.route.snapshot.paramMap.get('pageNumber').replace('page', ''))
    this.getPokemon()
  }
  
  getPokemon(): void {
    // step one, get the group of pokemon repsonses    
    this.pokemonSvc.getPageOfPokemon(this.pokemonFilter, this.currentPage)
    .subscribe(pageOfPokemon => {
      this.pokemonResultsArr = pageOfPokemon.results
      // step two, use the URL from each repsonse, to get the indvidual pokemon data
      this.pokemonResultsArr.map((eachPokemon, index) => {
        this.pokemonSvc.getIndividualPokemon(eachPokemon.name)
          .subscribe(individualPokemon => {
            this.pokemonArr.push(this.pokemonSvc.cleanPokemon(individualPokemon))
          })
      })
      this.collectionSize = pageOfPokemon.count
      this.maxPage = Math.ceil(pageOfPokemon.count / 50)
    });
  }

  nextPage() {
    this.router.navigate([`/pokedex/${this.pokemonFilter}/page${this.currentPage + 1}`]);
  }
  
  previousPage() {
    this.router.navigate([`/pokedex/${this.pokemonFilter}/page${this.currentPage - 1}`]);
  }
  
}

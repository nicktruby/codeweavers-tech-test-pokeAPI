import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { GroupPokemonResponse } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonArr : any;
  pokemonCount : number;

  previousPage : number = 1;
  currentPage : number = 1;
  nextPage : number = 2;
  maximumPage : number;

  constructor(
    private route: ActivatedRoute,
    private pokemonSvc: PokemonService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    console.log(this.pokemonArr);
    this.getPokemon()
  }
  
  getPokemon(): void {
    const filterFromURL : string = this.route.snapshot.paramMap.get('filter')
    const pageNumberFromURL : number = Number(this.route.snapshot.paramMap.get('pageNumber').replace('page', ''))
    this.pokemonSvc.getPageOfPokemon(filterFromURL, pageNumberFromURL)
    .subscribe(pageOfPokemon => {
      this.pokemonArr = pageOfPokemon.results
      this.pokemonCount = pageOfPokemon.count
      console.log(this.pokemonArr);
    });
  }


  // async getPokemon() {
  //   const filterFromURL : string = this.route.snapshot.paramMap.get('filter')
  //   const pageNumberFromURL : number = Number(this.route.snapshot.paramMap.get('pageNumber').replace('page', ''))

  //   this.pokemonSvc.getPageOfPokemon(filterFromURL, pageNumberFromURL)
    
  // }

  updatePageNumbers () {
    const pageNumberFromURL : string = this.route.snapshot.paramMap.get('pageNumber')
    const currentPage = Number(pageNumberFromURL.replace('page', ''));
    console.log(currentPage);
    this.currentPage = currentPage;
    console.log(currentPage > 1 ? currentPage - 1 : 1);
    this.previousPage = currentPage > 1 ? currentPage - 1 : 1;
    console.log(currentPage + 1);
    this.nextPage = currentPage + 1;
  }

}

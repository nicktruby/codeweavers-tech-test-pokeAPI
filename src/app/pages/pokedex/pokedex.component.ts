import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.pokemonSvc.getPageOfPokemon(this.pokemonFilter, this.currentPage)
    .subscribe(pageOfPokemon => {
      this.pokemonArr = pageOfPokemon.results
      this.collectionSize = pageOfPokemon.count
      this.maxPage = Math.ceil(pageOfPokemon.count / 50)
      console.log(this.maxPage);
      console.log(this.currentPage);
    });
  }

  nextPage() {
    // this.currentPage++
    // this.getPokemon()
    this.router.navigate([`/pokedex/${this.pokemonFilter}/page${this.currentPage + 1}`]);
  }
  
  previousPage() {
    // this.currentPage--
    // this.getPokemon()
    this.router.navigate([`/pokedex/${this.pokemonFilter}/page${this.currentPage - 1}`]);
  }
  
}

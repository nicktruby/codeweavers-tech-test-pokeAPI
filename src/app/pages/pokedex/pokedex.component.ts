import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonArr : any[] = [];

  currentPage : number = 1;
  maxPage : number;
  pageSize : number = 50;
  collectionSize : number = 50;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonSvc: PokemonService,
    private location: Location,
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
  }

  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.paramMap.get('pageNumber').replace('page', ''))
    this.getPokemon()
  }
  
  getPokemon(): void {
    this.pokemonSvc.getPageOfPokemon(this.currentPage)
    .subscribe(pageOfPokemon => {
      this.pokemonArr = pageOfPokemon.results
      this.collectionSize = pageOfPokemon.count
      this.maxPage = Math.ceil(pageOfPokemon.count / 50)
    });
  }

  nextPage() {
    this.router.navigate([`/pokedex/page${this.currentPage + 1}`]);
  }
  
  previousPage() {
    this.router.navigate([`/pokedex/page${this.currentPage - 1}`]);
  }
  
}

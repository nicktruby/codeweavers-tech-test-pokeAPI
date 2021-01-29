import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../../../shared/services/pokemon.service';
import { IndividualPokemonResponse, BackgroundColours, PokemonResult } from '../../../shared/models/pokemon.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() pokemon : any = {}

  backgroundClass: string = "bg-green";

  constructor(
    private pokemonSvc : PokemonService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getPokemon()
  }
  
  getPokemon(): void {
    this.pokemonSvc.getIndividualPokemon(this.pokemon.name)
    .subscribe(individualPokemon => {
      this.pokemon = this.pokemonSvc.cleanPokemon(individualPokemon)
      this.backgroundClass = BackgroundColours[this.pokemon.types[0]];
      });
  }

  handleCardClick(): void {
    this.router.navigate([`/detail/${this.pokemon.name}`]);
  }
}

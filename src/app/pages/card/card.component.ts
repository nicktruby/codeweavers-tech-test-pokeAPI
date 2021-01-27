import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../../shared/services/pokemon.service';
import { IndividualPokemonResponse, BackgroundColours } from '../../shared/services/models/pokemon.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() pokemon: any;

  backgroundClass: string;

  constructor(private pokemonSvc : PokemonService) { }

  ngOnInit(): void {
    this.pokemon = this.pokemonSvc.cleanPokemon(this.pokemon)
    // console.log(this.pokemon);
    const primaryType = this.pokemon.types[0]
    this.backgroundClass = BackgroundColours[primaryType];
    
  }

}

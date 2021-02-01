import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from './pages/pokedex/card/card.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PokedexComponent,
    PokemonDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

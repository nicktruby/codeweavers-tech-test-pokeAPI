import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardComponent } from './pages/pokedex/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    PokedexComponent,
    PokemonDetailsComponent
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

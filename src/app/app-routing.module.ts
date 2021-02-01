import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokedex/:pagenumber', pathMatch: 'full' },
  { path: 'pokedex/:pageNumber', component: PokedexComponent },
  { path: 'detail/:id', component: PokemonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
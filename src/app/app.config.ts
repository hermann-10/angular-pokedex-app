import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';


const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ],
};

import { Component, effect, model, signal, computed, inject } from '@angular/core';
import { Pokemon } from './../../pokemon.model';
import { PokemonBorderDirective } from './../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './../../pokemon.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `
    .pokemon-card {
        cursor: pointer;
      }
  `
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);
  //readonly pokemonList = signal(this.pokemonService.getPokemonList());
  readonly pokemonList = toSignal(this.pokemonService.getPokemonList(), {
    initialValue: [],
  });
  readonly searchTerm = signal('');
  //readonly searchTerm = model('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) => 
     pokemon.name
       .toLowerCase()
       .includes(this.searchTerm().trim().toLowerCase())
   );
  });

  // Émet "undefined" d'abord, puis le tableau de Pokémon.
  //readonly pokemonList = toSignal(this.pokemonService.getPokemonList());
  
  // Émet si une requête est en cours ou non.
  readonly loading = computed(() => !this.pokemonList());
  
  
  size(pokemon: Pokemon){
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
  
    return 'Moyen';
  }

  constructor() {}

  // incrementLife(pokemon: Pokemon){
  //   pokemon.life = pokemon.life +1;
  // }

  // decrementLife(pokemon: Pokemon){
  //   pokemon.life = pokemon.life - 1;
  // }
}

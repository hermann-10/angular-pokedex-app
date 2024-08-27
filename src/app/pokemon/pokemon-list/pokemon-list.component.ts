import { Component, effect, signal, computed, inject } from '@angular/core';
import { Pokemon } from './../../pokemon.model';
import { PokemonBorderDirective } from './../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './../../pokemon.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);
  readonly pokemonList = signal(this.pokemonService.getPokemonList());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) => 
     pokemon.name
       .toLowerCase()
       .includes(this.searchTerm().trim().toLowerCase())
   );
  });
  
  
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

  incrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life +1;
  }

  decrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life - 1;
  }
}

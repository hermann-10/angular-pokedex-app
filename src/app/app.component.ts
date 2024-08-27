import { Component, effect, signal, computed, inject } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pokedex-app';
  private readonly pokemonService = inject(PokemonService);
  name = signal('Pikachu');
  life = signal(21);
  doubleCounter = computed(() => this.life() * 2);
  imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');

  pokemonList = signal(this.pokemonService.getPokemonList());
  
  size(pokemon: Pokemon){
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
  
    return 'Moyen';
  }

  constructor() {
    effect(() => {
      console.log('Le compteur a été mis à jour :', this.life());

    });
  }

  incrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life +1;
  }

  decrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life - 1;
  }

  reset() {
    this.life.set(0);
  }


}

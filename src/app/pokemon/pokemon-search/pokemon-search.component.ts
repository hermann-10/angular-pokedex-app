import { Component, computed, inject, OnInit, signal } from '@angular/core'; 
import { Router } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { 
  debounceTime, 
  distinctUntilChanged, 
  filter, 
  switchMap 
} from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonList } from '../../pokemon.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {

  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient); 



  readonly searchTerm = signal('');
  readonly searchTerm$ = toObservable(this.searchTerm); 
 
  readonly suggestedPokemonList$ = this.searchTerm$.pipe(
    // Rechercher des Pokémons si le terme de recherche est assez long.
    filter(term => term.trim().length >= 2),
    // Attendre 300 millisecondes minimum entre chaque requête.
    debounceTime(300),
    // Ignorer la recherche en cours, si c'est la même que la précédente.
    distinctUntilChanged(),
    // Retourner la liste des Pokémons correspondant à la recherche.
    switchMap((term: string) => this.searchPokemons(term))
  );
 
  readonly suggestedPokemonList = toSignal(this.suggestedPokemonList$);
 


  constructor(){
    console.log('limber');
    // Consommation d'un Observable
    this.getName('limber').subscribe(name => console.log('Le premier nom: ', name));
  }
  // Création d'un Observable
  getName(userName: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/ditto`);
    //return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/ditto/${userName}`);
  }

  searchPokemons(term: string): Observable<any> {
    const API_URL = 'https://pokeapi.co/api/v2/pokemon/ditto';
    return this.http.get<any>(`${API_URL}?name_like=${term}`);
  }

  // goToPokemon(pokemonId: number): void { 
  //   let link = ['/pokemon', pokemon.id]; 
  //   this.router.navigate(link);
  // }
}

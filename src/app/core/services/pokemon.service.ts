import { effect, inject, Injectable, signal } from '@angular/core';
import { Pokemon, PokemonList } from '../../pokemon.model';
//import { POKEMON_LIST } from './pokemon-list.fake';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  //http = inject(HttpClient);
  private readonly http = inject(HttpClient); 
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';   
  pokemonList = signal(this.getPokemonList());


  constructor() {
    console.log('pokemonList():', this.pokemonList())

    effect(() => {
      console.log('Mise à jour de liste :', this.pokemonList());
    });
  }

  // Retourne la liste de tous les Pokémons.


  

  getPokemonList(): Observable<PokemonList> {
    console.log('this.POKEMON_API_URL:', this.POKEMON_API_URL);
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.
  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${id}`);
  }



  // Retourne la liste des types valides pour un pokémon.

  searchPokemon(term: string): Observable<PokemonList>
  {
    const API_URL = 'https://api.example.com/users';
    return this.http.get<PokemonList>(`${API_URL}?name_like=${term}`);
  }  

  // Création d'un Observable
getUser(userId: string): Observable<any> {
  return this.http.get<any>(`https://api.example.com/users/${userId}`);
}

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }

  // Met à jour un pokémon existant.
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.POKEMON_API_URL}/${pokemon.id}`, pokemon);
  }
 
  // Supprime un pokémon.
  deletePokemon(pokemonId: number): Observable<void> {  
    return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`);
  }
}

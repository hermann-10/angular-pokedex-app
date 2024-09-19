import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly http = inject(HttpClient); 

  constructor() {
    // this.http.get('someUrl').subscribe(data => {
    //   console.log(`The data from the server : ${data.toString()}`);
    // }); 

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
}

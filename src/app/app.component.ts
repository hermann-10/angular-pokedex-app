import { Component } from '@angular/core';
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {}
}

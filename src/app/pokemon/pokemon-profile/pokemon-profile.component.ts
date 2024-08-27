import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemonService = inject(PokemonService);
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
}

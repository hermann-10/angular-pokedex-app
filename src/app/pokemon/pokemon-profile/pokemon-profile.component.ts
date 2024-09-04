import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import {DatePipe} from '@angular/common';
import { Subscription } from 'rxjs';
import { Pokemon } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent implements OnInit, OnDestroy {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  routeSubscription: Subscription | null = null;

  readonly pokemonService = inject(PokemonService);

  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id')));

  pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId()));



	ngOnInit(): void {
	  	this.routeSubscription = this.route.params.subscribe(params => {
       
        const id = Number(params['id']);
        this.pokemonId.set(id); // Utilisation correcte du signal
	  	});
	  }
  
  next() {
    let nextId = this.pokemonId() || 0;
    console.log('nextId', nextId)
		nextId++;
    console.log('nextId++:', nextId)
    
    this.pokemon.set(this.pokemonService.getPokemonById(nextId)); // Mettre à jour le Pokémon
		this.router.navigate(['pokemons/' + nextId])
	}

  ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
	}

}



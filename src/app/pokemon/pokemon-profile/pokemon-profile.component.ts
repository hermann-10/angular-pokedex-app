import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import {DatePipe} from '@angular/common';
import { catchError, map, of, Subscription } from 'rxjs';
import { Pokemon } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';

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

  //readonly pokemon = toSignal<Pokemon | undefined>(this.pokemonService.getPokemonById(this.pokemonId()));
  
  // Notre nouveau Signal avec la réponse HTTP "brute".
  private readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId()).pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  // On déclare un nouveau Signal "pokemonListResponse"
  readonly pokemonListResponse = toSignal(
    this.pokemonService.getPokemonList().pipe(
      // En cas de succès
      map((value) => ({value, error: undefined })),
      // En cas d'erreur HTTP
      catchError((error) => of({value: undefined, error }))
    ),
  );

  
    // En attente de la réponse HTTP
    readonly loading = computed(() => !this.pokemonResponse());
    // Cas d'erreur HTTP
    readonly error = computed(() => this.pokemonResponse()?.error);

     // Cas de succès HTTP
  readonly pokemon = computed(() => this.pokemonResponse()?.value);

  isNavigateNext: boolean = true;
  isNavigatePrev: boolean = true;



	ngOnInit(): void {

     
	  	this.routeSubscription = this.route.params.subscribe(params => {
       
        const id = Number(params['id']);
        this.pokemonId.set(id); // Utilisation correcte du signal

        console.log('pokemonId():', this.pokemonId());
        console.log('pokemon NAME:', this.pokemon()?.name);
        console.log('Pokemon TEST: ', this.pokemonService.getPokemonById(this.pokemonId()));
	  	});
	  }

    deletePokemon(pokemonId: number) {
      this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
        this.router.navigate(['/pokemons']);
      });
    }
  
  next() {

      //console.log('Taille liste pokemon: ', this.pokemonService.getPokemonList().length)
    
      let nextId = this.pokemonId() || 0;
      console.log('BEFORE IF nextId', nextId)

      //if (this.pokemonService.getPokemonList().length > nextId)
       //if (this.pokemonId()){ //afin de vérifier s'il y a un autre élément de la liste
       this.isNavigateNext = true;
       nextId++;
       console.log('nextId++:', nextId)
      
       this.pokemonId.update(() => nextId); // Mettre à jour le Pokémon précédent
      //this.pokemon = toSignal<Pokemon | undefined>(this.pokemonService.getPokemonById(nextId));
   
       //this.pokemon.set(this.pokemonService.getPokemonById(nextId)); // Mettre à jour le Pokémon
       //this.pokemonId.update(value => nextId + 1);
       //this.pokemonId.set(nextId); 
       //this.pokemonId.update(() => +this.pokemonService.getPokemonById(nextId)); // Mettre à jour le Pokémon
       //this.pokemon.update(() => +this.pokemonService.getPokemonById(nextId)); // Mettre à jour le Pokémon

       this.router.navigate(['pokemons/' + nextId]);
       //}

    //  else{
    //    this.isNavigateNext = false;
    //    return;
    //  }
	}


  prev() {

      //console.log('Taille liste pokemon: ', this.pokemonService.getPokemonList().length)
    
      let prevId = this.pokemonId() || 0;
      console.log('BEFORE IF nextId', prevId)
      console.log('isNavigatePrev: ', this.isNavigatePrev);


    //   if (this.pokemonService.getPokemonList().length >= prevId || this.pokemonService.getPokemonList().length > 0){ //afin de vérifier s'il y a un autre élément de la liste
      
    //   this.isNavigatePrev = true;
    //   console.log('prevId', prevId)
    //   prevId--;
    //   console.log('prevId--:', prevId)
    //   console.log('isNavigatePrev: ', this.isNavigatePrev);

      
    //   this.pokemon.set(this.pokemonService.getPokemonById(prevId)); // Mettre à jour le Pokémon
    //   this.router.navigate(['pokemons/' + prevId]);
    //   }

    // else{
    //   this.isNavigatePrev = false;
    //   return;
    // }
	}

  ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
	}

}



import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, Pokemon, POKEMON_RULES } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, DatePipe, ReactiveFormsModule, JsonPipe],
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.css'
})
export class PokemonEditComponent implements OnInit{
  editForm!: FormGroup;
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemonService = inject(PokemonService);
 
  readonly pokemon = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId)
  );

  ngOnInit(){
    console.log(this.pokemon);
    this.editForm = this.fb.group({
      name: new FormControl('', [
             Validators.required,
             Validators.minLength(POKEMON_RULES.MIN_NAME),
             Validators.maxLength(POKEMON_RULES.MAX_NAME),
             Validators.pattern(POKEMON_RULES.NAME_PATTERN),
      ]),
      life: new FormControl(this.pokemon()?.life),
      damage: new FormControl(this.pokemon()?.damage),
      types: new FormArray([], 
        [Validators.required, 
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]),
      // types: new FormArray(
      //   this.pokemon()!.types.map((type) => new FormControl(type)),
      //   [
      //     Validators.required, 
      //     Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      //   ]
      // ),
    });
  }

  constructor() {
    // Cette fonction se déclenche une seule fois à la réception de la requête HTTP.
    effect(() => {
      const pokemon = this.pokemon();
  
      console.log(pokemon);
      if (pokemon) {
        // On hydrate les champs name, life et damage. (FormControl)
        this.editForm.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
  
        // On hydrate le champ type. (FormControl)
         pokemon.types.forEach((type) => {
           this.pokemonTypesList.push(new FormControl(type));
         });
      }
    });
  }

  // Get the selected Pokemon list by user.
  get pokemonTypesList(): FormArray{
    return this.editForm.get('types') as FormArray;
  }

  // Return if given type is already selected by user or not.
  isPokemonTypeSelected(type: string): boolean{
    return !!this.pokemonTypesList.controls.find(
      (control) => control.value === type
    );
  }

  // Add or remove a given type in the selected Pokemon list.
  onPokemonTypeChange(type: string, isChecked: boolean): void{
    if (isChecked){
      const control = new FormControl(type);
      this.pokemonTypesList.push(control);
    }
    else{
      const index = this.pokemonTypesList.controls
        .map((control) => control.value)
        .indexOf(type);
       this.pokemonTypesList.removeAt(index);
    }
  }

   getPokemonColor(type: string) {
     return getPokemonColor(type);
   }


  onSubmit() {
    const isFormValid = this.editForm.valid;
    const pokemon = this.pokemon();

    if(isFormValid && pokemon){
      const updatedPokemon: Pokemon = {
        ...pokemon,
        name: this.pokemonName.value as string,
        life: this.pokemonLife.value,
        damage: this.pokemonDamage.value,
        types: this.pokemonTypesList.value,
      }
      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        this.router.navigate(['/pokemons', this.pokemonId]);
      });
      console.log('submited values: ', this.editForm.value);
      console.log('pokemon: ', this.pokemon());
    }
    else{
      console.log('Check error ?')
    }   
  }

  get pokemonName() {
    return this.editForm.get('name') as FormControl;
  }

  get pokemonLife() {
    return this.editForm.get('life') as FormControl;
  }

  get pokemonDamage() {
    return this.editForm.get('damage') as FormControl;
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }
  
  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }
  
  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

  POKEMON_RULES_MAX_DAMAGE() {
    //return this.POKEMON_RULES.MAX_DAMAGE;
  }
}

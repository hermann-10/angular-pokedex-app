import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getPokemonColor } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, DatePipe, ReactiveFormsModule, JsonPipe],
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.css'
})
export class PokemonEditComponent {
  editForm!: FormGroup;
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemonService = inject(PokemonService);
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();

  constructor(){
    this.editForm = this.fb.group({
      name: new FormControl(this.pokemon().name),
      life: new FormControl(this.pokemon().life),
      damage: new FormControl(this.pokemon().damage),
      types: new FormArray(
        this.pokemon().types.map((type) => new FormControl(type))
      ),
    })
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
    console.log('submited values: ', this.editForm.value);
    //this.pokemonService.updatePokemon(this.editForm.value)
  }
}

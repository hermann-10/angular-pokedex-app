import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly name = signal('');
  readonly password = signal('');
  readonly message = signal(`Vous êtes déconnecté.`);

  onSubmit(event: Event) {
    event.preventDefault();
    this.message.set('Tentative de connexion en cours ...');
    this.authService
      .login(this.name(), this.password())
      .subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.name.set('');
          this.password.set('');
          this.message.set('Les identifiants saisis sont invalides.');

          return;
        }

        this.router.navigate(['/pokemons']);
      });
  }

}

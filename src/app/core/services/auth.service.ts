import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // L'utilisateur est-il connecté ? 
   private readonly _isLoggedIn = signal(false);
   readonly isLoggedIn = this._isLoggedIn.asReadonly();

   login(name: string, password: string): Observable<boolean> {
    // Faites appel à un autre service d'authentification si besoin ...
    const isLoggedIn = name === 'Pikachu#' && password === 'Pikachu#';
    this._isLoggedIn.set(isLoggedIn);

    return of(isLoggedIn).pipe(delay(1000));
  }

  constructor() { }
}

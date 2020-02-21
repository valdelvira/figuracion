import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if ( this.auth.isLogged()) { return true; // LLamo a la función para comprobar si el usuario esta logado
    } else { this.router.navigate(['/login']); return false; } // Si no lo está le redirecciono a login
  }
}

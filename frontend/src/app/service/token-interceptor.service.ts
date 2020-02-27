import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  intercept(req, next ) { // Esto nos permite interceptar las peticiones al back e inyectar lo que queramos
    const tokenReq = req.clone({ // Aqui clono la petición que hago al back e inyecto
      setHeaders: { // Incluyo en la cabecera el token ques espera el back
        Authorization: 'Bearer ' + this.authService.getToken() // Tipo clave valor. Uso el metodo Bearer, importante el espacio
      }
    });
    console.log(tokenReq);
    return next.handle(tokenReq); // Devuelvo la petición modificada
  }
  constructor( private authService: AuthService) { }
}




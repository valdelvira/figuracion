import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Hace las peticiones

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Defino las URL
  private signUpURL = 'http://localhost:3004/api/user';
  private loginURL = 'http://localhost:3004/api/login';

  constructor( private http: HttpClient ) { } // Instancio el objeto encargado de las peticiones


  // Función que recibe un objeto tipo user
  // Hace la petición http de tipo post con un objeto de cualquier tipo
  // la petición se hace a los parametros signUpURL y pasando un objeto user
  signUpUser(user) {
    return this.http.post<any>(this.signUpURL, user);
  }

  // Función para hacer el Login
  loginUser(user) {
    return this.http.post<any>(this.loginURL, user);
  }

  // Función que va a controlar que el usuario logado se pueda mover libremente
  isLogged() {
    return !!localStorage.getItem('token'); // Pregunto por el token almacenado
  }

}
